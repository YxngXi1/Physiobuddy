from flask import Flask, Response, jsonify, request, redirect, url_for, send_file
import cv2 as cv
import mediapipe as mp
import numpy as np
from flask_cors import CORS
import threading
import time
import webbrowser
import openai
import os
from dotenv import load_dotenv

app = Flask(__name__)

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)

CORS(app)

redirect_to_feedback = False
recording = False
out = None

selected_exercise = ''

# variables for the actual counting of exercise
counter = 0
stage = None
stop_reason = None
feedback_message = ""

load_dotenv('.env.local')

# Get the OpenAI API key from the environment variable
openai.api_key = os.getenv('OPENAI_API_KEY')

def generate_frames():
    global selected_exercise, counter, stage, recording, stop_reason, redirect_to_feedback

    def exercise1(results, image):
        global counter, stage
        try:
            def calculate_angle(a, b, c):
                a = np.array(a)
                b = np.array(b)
                c = np.array(c)

                radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
                angle = np.abs(radians * 180 / np.pi)

                if angle > 180:
                    angle = 360 - angle

                return angle

            landmarks = results.pose_landmarks.landmark

            hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
            knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x, landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
            ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]

            angle = calculate_angle(hip, knee, ankle)

            cv.putText(image, str(angle),
                       tuple(np.multiply(knee, [640, 480]).astype(int)),
                       cv.FONT_HERSHEY_SIMPLEX, 0.5, [255, 255, 255], 2, cv.LINE_AA)

            if angle > 160:
                stage = "down"
            if angle < 120 and stage == "down":
                stage = "up"
                counter += 1
                print(counter)

            cv.rectangle(image, (0, 0), (225, 73), (245, 117, 16), -1)

            cv.putText(image, 'REPS', (15, 12),
                       cv.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv.LINE_AA
                       )
            cv.putText(image, str(counter),
                       (10, 60),
                       cv.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 2, cv.LINE_AA
                       )

            cv.putText(image, 'STAGE', (65, 12),
                       cv.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv.LINE_AA
                       )
            cv.putText(image, stage,
                       (60, 60),
                       cv.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 2, cv.LINE_AA
                       )
        except:
            pass

    def exercise2(results, image):
        global counter, stage
        try:
            def calculate_angle(a, b, c):
                a = np.array(a)
                b = np.array(b)
                c = np.array(c)

                radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
                angle = np.abs(radians * 180 / np.pi)

                if angle > 180:
                    angle = 360 - angle

                return angle

            landmarks = results.pose_landmarks.landmark

            hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
            knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x, landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
            ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]

            angle = calculate_angle(hip, knee, ankle)

            cv.putText(image, str(angle),
                       tuple(np.multiply(knee, [640, 480]).astype(int)),
                       cv.FONT_HERSHEY_SIMPLEX, 0.5, [255, 255, 255], 2, cv.LINE_AA)

            if angle < 100:
                stage = "down"
            if angle > 120 and stage == "down":
                stage = "up"
                counter += 1
                print(counter)

            cv.rectangle(image, (0, 0), (225, 73), (245, 117, 16), -1)

            cv.putText(image, 'REPS', (15, 12),
                       cv.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv.LINE_AA
                       )
            cv.putText(image, str(counter),
                       (10, 60),
                       cv.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 2, cv.LINE_AA
                       )

            cv.putText(image, 'STAGE', (65, 12),
                       cv.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv.LINE_AA
                       )
            cv.putText(image, stage,
                       (60, 60),
                       cv.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 2, cv.LINE_AA
                       )
        except:
            pass

    camera = cv.VideoCapture(0)
    camera.set(3, 640)
    camera.set(4, 480)

    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            image = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
            image.flags.writeable = False

            results = pose.process(image)

            image.flags.writeable = True
            image = cv.cvtColor(image, cv.COLOR_RGB2BGR)

            if selected_exercise == 'exercise1':
                cv.putText(image, 'Bed Supported Knee Bend', (image.shape[1] // 2 - 200, 90), cv.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv.LINE_AA)
                exercise1(results, image)

            elif selected_exercise == 'exercise2':
                cv.putText(image, 'Sitting Supported Knee Bend', (image.shape[1] // 2 - 200, 90), cv.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv.LINE_AA)
                exercise2(results, image)

            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                      mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
                                      mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2))

            if recording and out is not None:
                out.write(image)
                cv.putText(image, 'Recording...', (10, 470), cv.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv.LINE_AA)
            else:
                cv.putText(image, 'Not Recording', (10, 470), cv.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv.LINE_AA)

            ret, buffer = cv.imencode('.jpg', image)
            frame = buffer.tobytes()

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

            if counter >= 9:
                stop_reason = 'reps'
                stop_recording()
                redirect_to_feedback = True
                break

def stop_recording():
    global recording, out, stop_reason, redirect_to_feedback
    if recording:
        recording = False
        if out is not None:
            out.release()
            out = None
        print("Recording stopped")
        webbrowser.open_new_tab("http://localhost:3000/feedback")

def stop_recording_after_delay(delay):
    global stop_reason
    time.sleep(delay)
    stop_reason = 'time'
    stop_recording()

@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        'message': "Connected! Get ready to work out!",
    })

@app.route('/start_recording', methods=['POST'])
def start_recording():
    global recording, out, selected_exercise, counter, stop_reason, redirect_to_feedback
    data = request.get_json()
    selected_exercise = data.get('exercise', 'exercise1')
    counter = 0  # Reset counter when starting a new recording
    stop_reason = None
    redirect_to_feedback = False
    if not recording:
        fourcc = cv.VideoWriter_fourcc(*'mp4v')
        out = cv.VideoWriter('output.mp4', fourcc, 20.0, (640, 480))
        recording = True
        threading.Thread(target=stop_recording_after_delay, args=(40,)).start()  # Stop recording after 40 seconds
    return jsonify({'message': 'Recording started', 'exercise': selected_exercise})

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/analyze_video', methods=['POST'])
def analyze_video():
    global feedback_message
    video_file_path = 'output.mp4'
    
    print("Starting video analysis...")  # Debug print

    if not os.path.exists(video_file_path):
        print(f"Error: {video_file_path} does not exist.")  # Debug print
        return jsonify({'error': 'Video file not found'}), 400

    try:
        # Call to OpenAI Vision Model to analyze the video and generate feedback
        response = openai.Image.create(
            file=open(video_file_path, 'rb'),
            model="gpt-4-vision",
            task="analyze-exercise",
            prompt=(
                "This is a video of an elderly person doing a physical therapy exercise. "
                "Please provide feedback suitable for someone recovering from surgery, considering factors like safety, efficiency, and proper form. "
                "Give constructive feedback such as 'slow down to avoid injury' or 'extend legs longer to improve the efficiency.'"
            )
        )

        print(f"OpenAI response: {response}")  # Debug print

        # Extract feedback from the response
        feedback_message = response['choices'][0]['message']['content']
        print(f"Extracted feedback: {feedback_message}")  # Debug print

        # Redirect to feedback page
        redirect_to_feedback = True
        return jsonify({'message': 'Video analyzed successfully', 'feedback': feedback_message})

    except Exception as e:
        print(f"Error during OpenAI API call: {e}")  # Debug print
        return jsonify({'error': str(e)}), 500

@app.route('/feedback_info')
def feedback():
    return jsonify({
        'message': ""
    })
    
@app.route('/video')
def get_video():
    video_path = 'path/to/your/video.mp4'  # Adjust the path to your video file
    range_header = request.headers.get('Range', None)
    if not os.path.exists(video_path):
        return Response(status=404)

    if range_header:
        byte_range = range_header.split('=')[1]
        start, end = byte_range.split('-')
        start = int(start)
        end = int(end) if end else os.path.getsize(video_path) - 1
        length = end - start + 1

        with open(video_path, 'rb') as f:
            f.seek(start)
            data = f.read(length)

        response = Response(data, status=206, mimetype='video/mp4')
        response.headers.add('Content-Range', f'bytes {start}-{end}/{os.path.getsize(video_path)}')
        response.headers.add('Accept-Ranges', 'bytes')
        response.headers.add('Content-Length', str(length))
    else:
        response = send_file(video_path, mimetype='video/mp4')

    return response

if __name__ == "__main__":
    app.run(debug=True, port=8080)
