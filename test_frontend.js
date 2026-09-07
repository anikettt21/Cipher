
async function run() {
  const API_BASE = 'http://127.0.0.1:8000';
  try {
    const dashRes = await fetch(`${API_BASE}/api/dashboard`);
    const stateRes = await fetch(`${API_BASE}/api/rollups/state`);
    const highRiskRes = await fetch(`${API_BASE}/api/projects?risk_level=HIGH&sort_by=risk_score&order=desc&page_size=10`);

    const dash = await dashRes.json();
    const states = await stateRes.json();
    let risky = await highRiskRes.json();

    console.log("risky.items.length:", risky.items ? risky.items.length : "undefined");

    if (risky.items && risky.items.length < 10) {
      const medRiskRes = await fetch(`${API_BASE}/api/projects?risk_level=MEDIUM&sort_by=risk_score&order=desc&page_size=${10 - risky.items.length}`);
      const medRisk = await medRiskRes.json();
      risky.items = [...risky.items, ...(medRisk.items || [])];
    }

    console.log("dash keys:", Object.keys(dash));
    console.log("states length:", states.length);
    if(states.length > 0) {
        console.log("states[0]:", states[0]);
    }
    
    // Sort states by avg risk score and take top 15
    states.sort((a, b) => b.avg_risk_score - a.avg_risk_score).slice(0, 15);
    console.log("SUCCESS!");
  } catch(e) {
    console.log("ERROR:", e);
  }
}
run();
