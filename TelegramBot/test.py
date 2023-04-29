import requests
SECRET_KEY = "django-insecure-tet*&pf*pj97xtryjv_d^gwn-4t2bu*piu_b@k-pqszp_bdikn"

import jwt
t =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyNzY3NjQzLCJpYXQiOjE2ODI3NjcwNDMsImp0aSI6IjU0ZDAyZWQzMjk4NDQwMTE4OGY1ODcyMTBjZGUwMGY2IiwidXNlcl9pZCI6NCwidXNlcm5hbWUiOiJhbGV4In0._8nmu8B9X_X-sdxwPbXOEEu3To3EAIhKrClmSx9n83E"
# a = requests.post(
#     "http://127.0.0.1:8000/api/" + "create_note/",
#     headers={"Authorization": f"Bearer {t}",},
#     data={"body": "iam testing new post", "category": 3, 'user':2},
# )
# print(a.status_code)
print(jwt.decode(t, SECRET_KEY,  algorithms='HS256', ))

