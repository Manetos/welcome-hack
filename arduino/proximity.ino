boolean wasHigh = false;

int proximityPin = 3;    //the digital pin connected to the PIR sensor's output
int ledPin = 13;

void setup(){
    Serial.begin(9600);
    pinMode(proximityPin, INPUT);
    pinMode(ledPin, OUTPUT);
    digitalWrite(proximityPin, LOW);

    //give the sensor some time to calibrate
    Serial.println("DEBUG: startup");
    Serial.println("DEBUG: calibrating sensor");
    // delay(1000 * 30); FIXME
    Serial.println("DEBUG: done");
    Serial.println("DEBUG: SENSOR ACTIVE");
}

void loop(){
    if(digitalRead(proximityPin) == HIGH){
        if (!wasHigh) {
            digitalWrite(ledPin, HIGH);
            Serial.println("PROXIMITY: HIGH");
            wasHigh = true;
        }
    }

    if(digitalRead(proximityPin) == LOW){
        if (wasHigh) {
            digitalWrite(ledPin, LOW);
            Serial.println("PROXIMITY: LOW");
            wasHigh = false;
        }
    }
}
