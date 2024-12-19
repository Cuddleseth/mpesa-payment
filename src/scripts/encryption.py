import sys
from portalsdk import APIContext, APIRequest

# Api key
api_key= str(sys.argv[1])

# Public key on the API listener used to encrypt keys
public_key = str(sys.argv[2])

# Create Context with API to request a Session ID
api_context = APIContext()

# Keys
api_context.api_key = api_key
api_context.public_key = public_key

#  Create a request object
api_request = APIRequest(api_context)

# Generate BearerToken
token = api_request.create_bearer_token()
print(token)

sys.stdout.flush()