import sys
import json
from portalsdk import APIContext, APIMethodType, APIRequest

# Api key
api_key= str(sys.argv[1])
public_key = str(sys.argv[2])
api_path = str(sys.argv[3])
api_address = str(sys.argv[4])

# Create Context with API to request a Session ID
api_context = APIContext()

# Keys
api_context.api_key = api_key
api_context.public_key = public_key
api_context.ssl = True
api_context.method_type = APIMethodType.GET
api_context.address = api_address
api_context.port = 443
api_context.path = api_path
api_context.add_header('Origin', '*')

#Do the API call and put result in a response packet
api_request = APIRequest(api_context)

# Do the API call and put result in a response packet
result = None
try:
    result = api_request.execute()
except Exception as e:
    print('Call Failed: ' + str(e))

if result is None:
    raise Exception('SessionKey call failed to get result. Please check.')

data = result.body
json_data = json.dumps(data, indent=4)

# Display results
print(json_data)

sys.stdout.flush()