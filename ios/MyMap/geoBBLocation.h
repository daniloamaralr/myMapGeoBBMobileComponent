//
//  geoBBLocation.h
//  MyMap
//
//  Created by Danilo Amaral Ribeiro on 7/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <CoreLocation/CoreLocation.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>

@interface geoBBLocation : NSObject <RCTBridgeModule, CLLocationManagerDelegate>


@property (nonatomic, strong) NSString *latitude;
@property (nonatomic, strong) NSString *longitude;
@property (nonatomic, strong) CLLocationManager *locationManager;

@end
