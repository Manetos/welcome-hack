#include <SPI.h>
#include <MFRC522.h>

boolean wasHigh = false;

int proximityPin = 3;    //the digital pin connected to the PIR sensor's output
int ledPin = 13;

#define RST_PIN     9       // 
#define SS_PIN      10      //

MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance

void setup(){
    Serial.begin(9600);
    pinMode(proximityPin, INPUT);
    pinMode(ledPin, OUTPUT);
    digitalWrite(proximityPin, LOW);

    SPI.begin();            // Init SPI bus
    mfrc522.PCD_Init();     // Init MFRC522

    //give the sensor some time to calibrate
    Serial.println("DEBUG: startup");
    Serial.println("DEBUG: calibrating sensor");
    // delay(1000 * 30); // FIXME
    Serial.println("DEBUG: done");
    Serial.println("DEBUG: SENSOR ACTIVE");
}

void loop2() {
    // Look for new cards
    if ( ! mfrc522.PICC_IsNewCardPresent()) {
        return;
    }

    // Select one of the cards
    if ( ! mfrc522.PICC_ReadCardSerial()) {
        return;
    }

    // UID
    Serial.print("CARD: ");
    for (byte i = 0; i < mfrc522.uid.size; i++) {
        if(mfrc522.uid.uidByte[i] < 0x10)
            Serial.print("0");
        Serial.print(mfrc522.uid.uidByte[i], HEX);
    } 
    Serial.println();
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
    loop2();
}
