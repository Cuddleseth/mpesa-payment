import sys
import json
from portalsdk import APIContext, APIMethodType, APIRequest

# Api key
api_key= str(sys.argv[1])
public_key = str(sys.argv[2])
api_path = str(sys.argv[3])
api_address = str(sys.argv[4])
input_Amount= int(sys.argv[5])
input_Currency = str(sys.argv[6])
input_CustomerMSISDN = str(sys.argv[7])
input_ServiceProviderCode = str(sys.argv[8])
input_ThirdPartyConversationID = str(sys.argv[9])
input_TransactionReference = str(sys.argv[10])
input_PaymentItemsDesc = str(sys.argv[11])

# Create Context with API to request a Session ID
api_context = APIContext()

# Keys
api_context.api_key = api_key
api_context.public_key = public_key
api_context.ssl = True
api_context.method_type = APIMethodType.POST
api_context.address = api_address
api_context.port = 443
api_context.path = api_path
api_context.add_header('Origin', '*')

# Parameters can be added to the call as well that on POST will be in JSON format and on GET will be URL parameters
# api_context.add_parameter('key', 'value')
api_context.add_parameter('input_Amount', input_Amount)
api_context.add_parameter('input_Country', 'DRC')
api_context.add_parameter('input_Currency', input_Currency)
api_context.add_parameter('input_CustomerMSISDN', input_CustomerMSISDN)
api_context.add_parameter('input_ServiceProviderCode', input_ServiceProviderCode)
api_context.add_parameter('input_ThirdPartyConversationID', input_ThirdPartyConversationID)
api_context.add_parameter('input_TransactionReference', input_TransactionReference)
api_context.add_parameter('input_PaymentItemsDesc', input_PaymentItemsDesc)

#Do the API call and put result in a response packet
api_request = APIRequest(api_context)

# Do the API call and put result in a response packet
result = None
try:
    result = api_request.execute()
except Exception as e:
    print('Call Failed: ' + str(e))

if result is None:
    raise Exception('API call failed to get result. Please check.')

data = result.body
json_data = json.dumps(data, indent=4)

# Display results
print(json_data)

sys.stdout.flush()