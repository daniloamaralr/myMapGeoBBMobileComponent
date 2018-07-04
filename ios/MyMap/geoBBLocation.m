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

@implementation geoBBLocation

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(setPositionNative:(double *)latitude) { //recebendo latitude
  //pegar localizacao atual
  NSLog(@"oiii");
  NSLog(@"%f",latitude);
  NSLog(@"%@", [NSString stringWithFormat:@"%f", latitude]);
  //NSLog(@"%@", [NSNumber numberWithDouble:latitude]);
}

@end
