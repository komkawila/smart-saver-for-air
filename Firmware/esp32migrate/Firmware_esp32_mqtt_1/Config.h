float tempOffset = 0.00;

#define maxcalTemp 20 // Max Array
#define maxAVGTemp 200 // Max AVG Array




float Slope_Setting = 0.04;     // Slope Setting
// not use
float temp_cutoff = 30; // Temp Cutoff
//end not use
float TempsLeak = 20.00;        // Temp Leak **
int TimesLeak = 600;            // Time Leak
int TimeNo1_Setting = 30;       // Time No.1 Back
int TimeNo2_Setting = 450;      // Time No.2 Start
int TimeNo3_Setting = 3600;     // Time No.3 End
int countSleep = 0;
int PulseMax_Setting = 360;     // Pulse Count(max)


int relayStartTime = 22;
int Pulse_Setting = PulseMax_Setting; // pulse เว็บ
float SleepTemps = 24.00f;
// SETTING
int CountSleep_Setting = 450;   // Sleep(Count Up)
