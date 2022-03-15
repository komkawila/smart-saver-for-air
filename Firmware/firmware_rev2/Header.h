#include "IO.h"
#include <OneWire.h>
#include <DallasTemperature.h>
#include "TimeInterval.h"
#include "GlobalVariable.h"
#include "Config.h"
#include "FunctionCalc.h"
#define ONE_WIRE_BUS 2
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature ds18b20(&oneWire);

IO buzzer = {BUZZER_PIN, HIGH}; // Active High
IO relay = {RELAY_PIN, HIGH}; // Active High
IO green = {LED_GREEN_PIN, LOW}; // Active Low
IO yellow = {LED_YELLOW_PIN, LOW}; // Active Low

Timer timeCountTimer;
Timer temperatureTimer;
Timer ledgreenTimer;
