#include "IO.h"
#include <OneWire.h>
#include <DallasTemperature.h>
#include "TimeInterval.h"
#include "GlobalVariable.h"
#include "Config.h"
#include "FunctionCalc.h"

// Wifi
#include "WifiConfig.h"
#include <WiFi.h>
#include <PubSubClient.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#define ONE_WIRE_BUS 15  // TEMP GPIO12 // original 2
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature ds18b20(&oneWire);

IO buzzer = {BUZZER_PIN, HIGH}; // Active High
IO relay = {RELAY_PIN, HIGH}; // Active High
IO green = {LED_GREEN_PIN, HIGH}; // Active Low
IO yellow = {LED_YELLOW_PIN, HIGH}; // Active Low
IO logo = {LED_LOGO_PIN, HIGH}; // Active Low

Timer timeCountTimer;
Timer temperatureTimer;
Timer ledgreenTimer;
Timer mqttTimer;

WiFiClient espClient;
PubSubClient client(espClient);
