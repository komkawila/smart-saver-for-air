float tempOffset = 0.00;

#define maxcalTemp 20 // Max Array
#define maxAVGTemp 200 // Max AVG Array


int relayStartTime = 22;

int Pulse_Setting = 0;

float SleepTemps = 24.00f;
int countSleep = 0;

// SETTING
float TempsLeak = 20.00;        // Temp Leak **
int TimesLeak = 600;            // Time Leak
int PulseMax_Setting = 360;     // Pulse Count(max)
int CountSleep_Setting = 450;   // Sleep(Count Up)




float Slope_Setting = 0.04;     // Slope Setting
// not use
float temp_cutoff = 30; // Temp Cutoff
float temp_MaxOffset = -2; // Temp Max Offset
float temp_MinOffset = 2; // Temp Min Offset
//end not use
int TimeNo1_Setting = 30;       // Time No.1 Back
int TimeNo2_Setting = 450;      // Time No.2 Start
int TimeNo3_Setting = 3600;     // Time No.3 End
