/* credits to http://forums.trossenrobotics.com/tutorials/how-to-diy-128/complete-control-of-an-arduino-via-serial-3300/
 * 1 = Wright:
 *     1 = analog:
 *         "pin number"
 *         "1 for LOW"
 *         "2 for HIGH"
 *     2 = digital:
 *         "pin number"
 *         "frequency (0-255)"
 *  2 = Read:
 *     1 = analog:
 *         "pin number"
 *     2 = digital:
 *         "pin number"
 *
 *  '1/2/7/1/' will turn pin 7 on HIGH
 *  '1/2/7/0/' would turn pin 7 to LOW
 *  '1/1/7/255/' would turn pin 7 on at a analog rate of 255 or full power
 *
 */

#include <WebUSB.h>

// for local testing
// 0 = HTTP
//WebUSB WebUSBSerial(0, "localhost:7400/circuit/?tutorial=pairWebUSB");

// for productive
// 1 = HTTPS
WebUSB WebUSBSerial(1, "freegroup.github.io/brainbox/circuit/?tutorial=pairWebUSB");
#define Serial WebUSBSerial

unsigned long serialdata;
int inbyte;
int servoPose;
int servoPoses[80] = {};
int attachedServos[80] = {};
int servoPin;
int pinNumber;
int sensorVal;
int analogRate;
int digitalState;

void setup(){
  while (!Serial) {;}
  Serial.begin(9600);
  Serial.println("Arduino with Brainbox sketch up and running");
}

void loop(){
  getSerial();
  switch(serialdata){
    case 1:
    {
      //analog digital write
      getSerial();
      switch (serialdata){
        case 1:
        {
          //analog write
          getSerial();
          pinNumber = serialdata;
          getSerial();
          analogRate = serialdata;
          pinMode(pinNumber, OUTPUT);
          analogWrite(pinNumber, analogRate);
          pinNumber = 0;
          break;
        }
        case 2:
        {
          //digital write
          getSerial();
          pinNumber = serialdata;
          getSerial();
          digitalState = serialdata;
          pinMode(pinNumber, OUTPUT);
          if (digitalState == 1){
            digitalWrite(pinNumber, LOW);
          }
          if (digitalState == 2){
            digitalWrite(pinNumber, HIGH);
          }
          pinNumber = 0;
          break;

        }
     }
     break;
    }
    case 2:
    {
      getSerial();
      switch (serialdata)
      {
        case 1:
        {
          //analog read
          getSerial();
          pinNumber = serialdata;
          pinMode(pinNumber, INPUT);
          sensorVal = analogRead(pinNumber);
          Serial.println(sensorVal);
          sensorVal = 0;
          pinNumber = 0;
          break;
        }
        case 2:
        {
          //digital read
          getSerial();
          pinNumber = serialdata;
          pinMode(pinNumber, INPUT);
          sensorVal = digitalRead(pinNumber);
          Serial.println(sensorVal);
          sensorVal = 0;
          pinNumber = 0;
          break;
        }
      }
      break;
    }
  }
}


long getSerial()
{
  serialdata = 0;
  while (inbyte != '/')
  {
    inbyte = Serial.read();
    if (inbyte > 0 && inbyte != '/')
    {
      serialdata = serialdata * 10 + inbyte - '0';
    }
  }
  inbyte = 0;
  return serialdata;
}
