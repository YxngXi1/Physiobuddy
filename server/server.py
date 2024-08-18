from flask import Flask, Response, jsonify
import cv2 as cv
import mediapipe as mp
import numpy as np
from flask_cors import CORS
import threading
import time

app = Flask(__name__)

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)
CORS(app)

recording = False
out = None

@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        'message': "This is actually so freaking cool lmao",
        'people': ["yang", "name", "another name"]
    })

@app.route('/start_recording', methods=['POST'])
def start_recording():
    global recording, out
    if not recording:
        fourcc = cv.VideoWriter_fourcc(*'mp4v')
        out = cv.VideoWriter('output.mp4', fourcc, 20.0, (640, 480))
        recording = True
        threading.Thread(target=stop_recording_after_delay, args=(10,)).start()
    return jsonify({'message': 'Recording started'})

def stop_recording_after_delay(delay):
    global recording, out
    time.sleep(delay)
    recording = False
    if out is not None:
        out.release()
        out = None

def generate_frames():
    global recording, out
    camera = cv.VideoCapture(0)
    camera.set(3, 640)
    camera.set(4, 480)

    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            # Recoloring to RGB
            image = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
            image.flags.writeable = False
            
            # Make the detection
            results = pose.process(image)
            
            # Recoloring back into BGR
            image.flags.writeable = True
            image = cv.cvtColor(image, cv.COLOR_RGB2BGR)
            
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
            
            if recording and out is not None:
                out.write(image)
                cv.putText(image, 'Recording...', (10, 30), cv.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv.LINE_AA)
            else:
                cv.putText(image, 'Not Recording', (10, 30), cv.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv.LINE_AA)
            
            ret, buffer = cv.imencode('.jpg', image)
            frame = buffer.tobytes()

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(debug=True, port=8080)