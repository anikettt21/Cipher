import json
import pandas as pd
import numpy as np

df = pd.read_csv("backend/data/outputs/project_risk_scores.csv")
df = df.replace({np.nan: None})
records = df.to_dict(orient="records")
try:
    json.dumps(records, allow_nan=False)
    print("project_risk_scores is STRICT valid JSON")
except Exception as e:
    print("project_risk_scores Error:", e)

df = pd.read_csv("backend/data/outputs/state_rollup.csv")
df = df.replace({np.nan: None})
records = df.to_dict(orient="records")
try:
    json.dumps(records, allow_nan=False)
    print("state_rollup is STRICT valid JSON")
except Exception as e:
    print("state_rollup Error:", e)

