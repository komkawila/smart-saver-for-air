
//const char* ssid = "lockerwifi";
//const char* password =  "tpp@ssw0rd";
const char* ssid = "stt2gwifi";
const char* password =  "025113423";
//const char* ssid = "stt2gwifi-xiaomi";
//const char* password =  "025113423";
//const char* ssid = "komkawila";
//const char* password =  "12345678";
const char* mqttServer = "dns.sttslife.co";
const int mqttPort = 1883;
const char* mqttUser = "root";
const char* mqttPassword = "P@ssw0rd";
String topic = "1";
String user_username = "user11";
//String clientName = "sttslife-" + user_username;
//String clientName = "sttslife-";
String clientName = "";

const char* ntpServer = "pool.ntp.org";
const long  gmtOffset_sec = 25200;
const int   daylightOffset_sec = 3600;


String user_password;

int user_id = 0;
int user_modes = 0;
int user_enable = 0;
float config_slope;
float config_tempcutoff;
float config_templeak;
int config_timeleak;
int config_time1;
int config_time2;
int config_time3;
int config_sleep;
int config_pulsecount;
