import json
import urllib.parse

# READDDDDD
with open('test1.json', 'r') as file:
    json_content = json.load(file)

# stringify
json_string = json.dumps(json_content)

# encoding
url_encoded_string = urllib.parse.quote(json_string)

# putting it somewhere else
with open('encoded_output.txt', 'w') as output_file:
    output_file.write(url_encoded_string)

print("URL encoded string has been written to encoded_output.txt")