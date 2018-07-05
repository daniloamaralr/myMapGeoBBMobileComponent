//
//  geoBBLocation.m
//  MyMap
//
//  Created by Danilo Amaral Ribeiro on 7/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "geoBBLocation.h"
#import <CoreLocation/CoreLocation.h>
#import <CoreLocation/CLLocationManager.h>
#import <React/RCTConvert.h>

@interface geoBBLocation() {
  NSArray *_arr;
  NSArray *_dic;
  NSUserDefaults *defaults;
}
@end

@implementation geoBBLocation

RCT_EXPORT_MODULE()

- (instancetype)init
{
  self = [super init];
  
  self.locationManager = [[CLLocationManager alloc]init]; // inicializando locationManager
  self.locationManager.delegate = self; // delegando locationManager para a classe vigente.
  self.locationManager.desiredAccuracy = kCLLocationAccuracyBest;
  //[locationManager requestWhenInUseAuthorization];
  [self.locationManager requestAlwaysAuthorization];
  
  return self;
  
}

- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations {
  if (locations.count > 0) {
    CLLocation *loc = [locations firstObject];
    
    if (![CLLocationManager isMonitoringAvailableForClass:CLCircularRegion.class]) {
      NSLog(@"Região: MONITORAÇÃO NÃO DISPONÍVEL");
    }
    
    if (self.locationManager.monitoredRegions.count > 0) {
      NSArray *arr = [self.locationManager.monitoredRegions allObjects];
      CLCircularRegion *cr = [arr objectAtIndex:0];
      CLLocation *regLoc = [[CLLocation alloc] initWithLatitude:cr.center.latitude longitude:cr.center.longitude];
      //CLLocationDistance meters = [loc distanceFromLocation:regLoc];
      
      [self.locationManager requestStateForRegion:cr];
      
      NSLog(@"value of latitude : %f \n", loc.coordinate.latitude);
      NSLog(@"value of longitude : %f \n", loc.coordinate.longitude);
      
      
    }
  }
}

//RCT_EXPORT_METHOD(setPositionNative:(nonnull NSNumber *)latitude longitude:(nonnull NSNumber *)longitude) { //recebendo latitude e longitude atual
//
//  //CoreLocation para receber lat e long
//  NSLog(@"value of latitude : %@ \n", latitude);
//  NSLog(@"value of latitude : %@ \n", longitude);
//
//  CLLocationCoordinate2D coord;
//  coord.latitude = (CLLocationDegrees)[latitude doubleValue];
//  coord.longitude = (CLLocationDegrees)[longitude doubleValue];
//
//  self.locationManager = [CLLocationManager new];
//  self.locationManager.delegate = self;
//  self.locationManager.desiredAccuracy = kCLLocationAccuracyBestForNavigation;
//  //[locationManager setDistanceFilter: kCLLocationAccuracyNearestTenMeters];
//
//  //autorizacao para uso de localizacao sempre
//  if ([self.locationManager respondsToSelector:@selector(requestAlwaysAuthorization)]) {
//    [self.locationManager requestAlwaysAuthorization];
//  }
//
//  for (CLRegion *cr in _locationManager.monitoredRegions) {
//    [self.locationManager stopMonitoringForRegion:cr];
//  }
//
//  [self.locationManager startUpdatingLocation];
//
//}


RCT_EXPORT_METHOD(setAgencias:(NSArray *)array) { //recebendo JSON das agencias
  _arr = array;
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *documentsDirectory = [paths objectAtIndex:0];
  NSString *plistPath = [documentsDirectory stringByAppendingPathComponent:@"agencias.plist"];
  NSLog(@"%@", plistPath);
  [array writeToFile:plistPath atomically: YES];
  
  //criando geofences
  for (NSDictionary *dic in _arr) {
    id latitude = [dic valueForKey:@"latitude"];
    id longitude = [dic valueForKey:@"longitude"];
    id num = [dic valueForKey:@"id"];
    if (latitude && longitude && num) {
      double lat = [latitude doubleValue];
      double lng = [longitude doubleValue];
      int numR = [num intValue];
      CLLocationCoordinate2D geofenceRegionCenter = CLLocationCoordinate2DMake(lat, lng);
      NSString *name = [[NSString alloc] initWithFormat:@"Regiao %d", numR];
      CLCircularRegion *geofenceRegion =[[CLCircularRegion alloc] initWithCenter:geofenceRegionCenter radius:100.0 identifier:name];
      geofenceRegion.notifyOnExit = YES;
      geofenceRegion.notifyOnEntry = YES;
      [self.locationManager startMonitoringForRegion:geofenceRegion];
    }
  }
}

RCT_EXPORT_METHOD(setPlist){ //when dont have connection, read plist file
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *documentsDirectory = [paths objectAtIndex:0];
  NSString *plistPath = [documentsDirectory stringByAppendingPathComponent:@"agencias.plist"];
  NSLog(@"%@",plistPath);
  _dic = [[NSArray alloc] initWithContentsOfFile:plistPath];
  
  
  //criando geofences
  for (NSDictionary *dic in _dic) {
    id latitude = [dic valueForKey:@"latitude"];
    id longitude = [dic valueForKey:@"longitude"];
    id num = [dic valueForKey:@"id"];
    if (latitude && longitude && num) {
      double lat = [latitude doubleValue];
      double lng = [longitude doubleValue];
      int numR = [num intValue];
      CLLocationCoordinate2D geofenceRegionCenter = CLLocationCoordinate2DMake(lat, lng);
      NSString *name = [[NSString alloc] initWithFormat:@"Regiao %d", numR];
      CLCircularRegion *geofenceRegion =[[CLCircularRegion alloc] initWithCenter:geofenceRegionCenter radius:100.0 identifier:name];
      geofenceRegion.notifyOnExit = YES;
      geofenceRegion.notifyOnEntry = YES;
      [self.locationManager startMonitoringForRegion:geofenceRegion];
    }
  }
}

-(void)locationManager:(CLLocationManager *)manager didEnterRegion:(CLRegion *)region {
  
  NSString *mensagem = [[NSString alloc] initWithFormat:@"Enter region: %f - %f", region.center.latitude, region.center.longitude];
  
  UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"GEO" message:mensagem preferredStyle:UIAlertControllerStyleAlert];
  UIAlertAction* okButton = [UIAlertAction
                             actionWithTitle:@"OK"
                             style:UIAlertActionStyleDefault
                             handler:nil];
  
  [alertController addAction:okButton];
  
  UILocalNotification *localNotification = [[UILocalNotification alloc] init];
  localNotification.alertBody = mensagem;
  localNotification.timeZone = [NSTimeZone defaultTimeZone];
  localNotification.soundName = UILocalNotificationDefaultSoundName;
  [[UIApplication sharedApplication] scheduleLocalNotification:localNotification];
  
  //enter region... send to react
  CLLocationCoordinate2D center = ((CLCircularRegion *)region).center;
  NSString *latitude = [NSString stringWithFormat:@"%f", center.latitude];
  NSString *longitude = [NSString stringWithFormat:@"%f", center.longitude];
  
  NSDictionary *payload = @{@"latitude": latitude, @"longitude": longitude};
  
  [self.bridge.eventDispatcher sendDeviceEventWithName:@"mov/geo/enterLocation" body:payload];
}

-(void)locationManager:(CLLocationManager *)manager didExitRegion:(CLRegion *)region {
  
  NSString *mensagem = [[NSString alloc] initWithFormat:@"Exit region: %f - %f", region.center.latitude, region.center.longitude];
  UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"GEO" message:mensagem preferredStyle:UIAlertControllerStyleAlert];
  UIAlertAction* okButton = [UIAlertAction
                             actionWithTitle:@"OK"
                             style:UIAlertActionStyleDefault
                             handler:nil];
  
  [alertController addAction:okButton];
  
  UILocalNotification *localNotification = [[UILocalNotification alloc] init];
  localNotification.alertBody = mensagem;
  localNotification.timeZone = [NSTimeZone defaultTimeZone];
  localNotification.soundName = UILocalNotificationDefaultSoundName;
  [[UIApplication sharedApplication] scheduleLocalNotification:localNotification];
}

@end
