import cv2 as cv
import mediapipe as mp
import numpy as np

mp_drawing= mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

cap = cv.VideoCapture(0)

# setting up mediapipe ruh roh
with mp_pose.Pose(min_detection_confidence = 0.5, min_tracking_confidence = 0.5) as pose:
    
    while cap.isOpened():
        ret, frame = cap.read()
        
        # recorloring to RGB
        image = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
        image.flags.writeable = False
        
        # make the detection
        results = pose.process(image)
        
        # recolroing back into the normal amazing spectacular BGR
        image.flags.writeable = True
        image = cv.cvtColor(image, cv.COLOR_RGB2BGR)
        
        
        mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
        
        cv.imshow("my mediapipe projet" , image)
        
        if cv.waitKey(10) & 0xFF == ord('q'):
            break
            
    cap.release()
    cv.destroyAllWindows()