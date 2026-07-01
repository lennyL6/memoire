from reportlab.lib.pagesizes import landscape
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.units import inch
from pathlib import Path
import textwrap

OUT = Path(__file__).resolve().parents[1] / 'exports' / 'Fiducial_FPSG_Soutenance_Backup.pdf'
W, H = 16*inch, 9*inch
DEEP = HexColor('#007A3D')
ACCENT = HexColor('#00A86B')
MINT = HexColor('#DFF3EA')
ANTH = HexColor('#2F3A3A')
LIGHT = HexColor('#E8ECEA')
OFF = HexColor('#F7FAF8')

slides = [
('1', 'Opening', 'Enhancing the Commercial Development of High-Value Training Offers at Fiducial FPSG', ['E-learning, Augmented Reality & Virtual Reality', 'Lenny Lanfrey - MBA Management International Business - MBway Lyon - 2026']),
('2', 'Executive roadmap', 'A consulting logic, from issue to recommendation', ['Business issue', 'Methodology', 'Diagnosis', 'Benchmark', 'Strategic synthesis', 'Action plan', 'Budget & ROI', 'Risks & final recommendation']),
('3', 'Core business issue', 'Innovation exists. Scalability is the issue.', ['Existing high-value offers', 'Uneven sales force appropriation', 'Unclear positioning for some offers', 'Lack of dedicated monitoring']),
('4', 'Problem statement', 'How can Fiducial FPSG enhance and commercialize its high-value training offers: e-learning, augmented reality and virtual reality for professional clients, considering their commercial development potential?', ['Strategic issue', 'Commercial issue', 'Operational issue']),
('5', 'Methodology', 'A mixed approach to avoid a purely theoretical answer', ['Literature review', 'Internal diagnosis', 'Existing offers and commercial proposals', 'Four-perspective benchmark', 'Strategic synthesis', 'Recommendations', 'Budget, ROI and risks']),
('6', 'Benchmark logic', 'Four perspectives, one commercial question', ['Apave: direct competitor', 'Rockefeller: pedagogical innovation', 'OCP: key account client', 'Axe Capital: B2B sales strategy', 'Criteria: value, barriers, targets, sales tools, lessons']),
('7', 'Three offers maturity snapshot', 'Three offers, three commercial maturity levels', ['E-learning: high-value key account potential', 'AR: most accessible short-term lever', 'VR: pedagogically relevant but commercially underactivated']),
('8', 'E-learning diagnosis', 'High value, but limited internal scalability', ['Decathlon proposal: EUR 4,500 HT', 'Paris La Defense proposal: EUR 5,720 HT', 'IBM project: EUR 13,560 HT', 'Issue: too dependent on senior sales profiles']),
('9', 'Augmented reality diagnosis', 'The most mature short-term lever', ['Familiar fire safety need', 'Easy to demonstrate', 'Visual and engaging', 'Strong upsell potential', 'Needs stronger monitoring']),
('10', 'Virtual reality diagnosis', 'Relevant, but commercially underactivated', ['Road risk as professional risk', 'Targets: vehicle fleets, logistics, field teams, mobile employees', 'Issue: unclear positioning', 'Risk: perceived as a gadget']),
('11', 'Internal diagnosis', 'Assets are real. Commercial system is incomplete.', ['Strengths: innovative portfolio, safety credibility, B2B client base, customized e-learning ability, positive AR feedback', 'Weaknesses: no dedicated objectives, insufficient training, uneven knowledge, limited materials, no KPI dashboard']),
('12', 'External diagnosis', 'Demand is evolving, but adoption is not automatic', ['Opportunities: flexible training demand, modernization, upsell, differentiation', 'Threats: price sensitivity, resistance to change, face-to-face habits, gadget perception, short-term ROI proof']),
('13', 'Benchmark synthesis', 'Innovation must become perceived value', ['Apave: sell operational solutions', 'Rockefeller: pedagogical credibility matters', 'OCP: key accounts need proof and simplicity', 'Axe Capital: value-based selling and sales enablement']),
('14', 'Strategic synthesis', 'From innovation availability to commercial scalability', ['Clear value proposition -> Sales force appropriation -> Client understanding -> Adoption -> Commercial performance']),
('15', 'Target segmentation', 'Do not sell everything to everyone', ['E-learning: large accounts, multi-site clients, specific internal processes', 'AR: existing fire safety clients, SMEs, recurring B2B clients', 'VR: vehicle fleets, logistics, field teams, mobile employees']),
('16', 'Recommended positioning', 'A safety training expert using digital and immersive levers', ['Fiducial FPSG should not become a technology provider', 'It should remain a safety training expert using digital and immersive solutions to improve compliance, prevention and learner engagement']),
('17', 'Action plan overview', 'Four actions to structure commercial scalability', ['1. Create a clear commercial offer portfolio', '2. Train salespeople in value-based selling', '3. Launch a 40-client pilot campaign', '4. Implement dedicated KPIs and monthly monitoring']),
('18', 'Recommendation 1', 'Create a clear commercial offer portfolio', ['One sales sheet per offer', 'Target clients', 'Client problem solved', 'Key benefits', 'Price logic', 'Use cases', 'Objections', 'Proof elements']),
('19', 'Recommendation 2', 'Train salespeople in value-based selling', ['First group of 4 salespeople', '1-day session', 'Demonstrations', 'Objection handling', 'Discovery questionnaire', 'Internal training cost = 4 salespeople x 7 hours x loaded hourly cost']),
('20', 'Recommendation 3', 'Launch a 40-client pilot campaign', ['40 priority clients', 'Existing portfolio first', 'Segment by offer relevance', 'Targeted email', 'Phone follow-up', 'Demonstrations / pilot sessions', 'Refusal reasons tracked']),
('21', 'Recommendation 4', 'Install a dedicated KPI dashboard', ['Offers presented', 'Demonstrations', 'Quotes issued', 'Quote value', 'Conversion rate', 'Signed revenue', 'Gross margin', 'Average deal value', 'Client satisfaction', 'Refusal reasons']),
('22', 'Budget and 2025 baseline', 'A proportionate commercial structuring investment', ['Commercial offer portfolio: EUR 1,300-2,000', 'Sales team training: EUR 2,000-3,500', 'Targeted pilot campaign: EUR 1,500-2,300', 'KPI dashboard: EUR 0-500', 'Total direct budget: EUR 4,800-8,300', '2025 baseline: AR EUR 347,705; e-learning EUR 48,974; VR EUR 5,800; total EUR 402,479', 'Direct budget = approximately 1.2% to 2.1% of 2025 signed revenue']),
('23', 'ROI scenarios and break-even', 'A cautious ROI framework, not a promised result', ['Conservative +5%: EUR 20,124 additional signed revenue', 'Realistic +10%: EUR 40,248 additional signed revenue', 'Ambitious +20%: EUR 80,496 additional signed revenue', 'Break-even margin: conservative 23.9%-41.2%; realistic 11.9%-20.6%; ambitious 6.0%-10.3%', 'ROI must be calculated on additional gross margin, not only revenue']),
('24', 'Risks, limits and final recommendation', 'Segment. Enable. Pilot. Measure. Scale.', ['Risks: sales adoption, price resistance, VR gadget perception, lack of KPI follow-up, lack of time, weak client response', 'Limits: price sensitivity, client resistance, adoption not guaranteed, VR repositioning, no definitive ROI without margin data', 'Final recommendation: transform existing innovation into structured, measurable and scalable commercial growth drivers'])
]
annexes = [
('A1', 'Detailed budget table', 'Direct budget detail', ['Offer portfolio: EUR 1,300-2,000', 'Sales training: EUR 2,000-3,500', 'Pilot campaign: EUR 1,500-2,300', 'KPI dashboard: EUR 0-500']),
('A2', 'Detailed ROI calculation', 'Break-even logic', ['Conservative: 23.9%-41.2%', 'Realistic: 11.9%-20.6%', 'Ambitious: 6.0%-10.3%']),
('A3', 'KPI dashboard template', 'Recommended indicators, not actual results', ['Offers presented', 'Demonstrations', 'Quotes', 'Conversion', 'Signed revenue', 'Gross margin', 'Refusal reasons']),
('A4', 'Benchmark detailed grid', 'Four complementary perspectives', ['Apave', 'Rockefeller', 'OCP', 'Axe Capital']),
('A5', 'Potential jury questions', 'Short answers', ['Why these actors?', 'Is ROI guaranteed?', 'Why 40 clients?', 'Why not become a tech provider?']),
('A6', 'Offer definitions', 'E-learning / AR / VR', ['E-learning: reusable training asset', 'AR: engaging fire awareness', 'VR: road risk prevention simulation']),
('A7', 'Oral timing plan', 'Target 34-38 minutes', ['Opening 5-6 min', 'Methodology 3-4 min', 'Diagnosis 10-12 min', 'Benchmark/synthesis 6-7 min', 'Action plan 8-10 min', 'Budget/ROI/risks 8-10 min']),
('A8', 'Static backup summary', 'Core message', ['Fiducial FPSG has innovation', 'The priority is commercial structuring', 'Segment -> Enable -> Pilot -> Measure -> Scale'])
]

def wrap(text, width):
    return textwrap.wrap(text, width=width, break_long_words=False)

def draw_text_box(c, x, y, w, h, title, body, fill=white, title_color=DEEP):
    c.setFillColor(fill)
    c.roundRect(x, y, w, h, 14, stroke=0, fill=1)
    c.setFillColor(title_color)
    c.setFont('Helvetica-Bold', 13)
    c.drawString(x+18, y+h-28, title)
    c.setFillColor(ANTH)
    c.setFont('Helvetica', 11)
    yy = y+h-52
    for line in wrap(body, 46):
        c.drawString(x+18, yy, line)
        yy -= 14
        if yy < y+14: break

def draw_slide(c, screen, kicker, title, bullets, appendix=False):
    c.setFillColor(OFF)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    c.setFillColor(MINT)
    c.circle(W-70, 70, 180, stroke=0, fill=1)
    c.setFillColor(DEEP)
    c.roundRect(42, H-72, 34, 34, 9, stroke=0, fill=1)
    c.setFillColor(OFF)
    c.roundRect(50, H-60, 18, 4, 2, stroke=0, fill=1)
    c.roundRect(50, H-48, 18, 4, 2, stroke=0, fill=1)
    c.setFillColor(ANTH)
    c.setFont('Helvetica-Bold', 12)
    c.drawString(88, H-58, 'FIDUCIAL FPSG')
    c.setFillColor(DEEP)
    c.setFont('Helvetica-Bold', 10)
    c.drawRightString(W-42, H-54, f'{screen} / 24' if not appendix else str(screen))
    c.setFillColor(DEEP)
    c.setFont('Helvetica-Bold', 13)
    c.drawString(60, H-115, kicker.upper())
    c.setFillColor(ANTH)
    c.setFont('Helvetica-Bold', 34 if len(title) < 90 else 27)
    yy = H-155
    for line in wrap(title, 58 if len(title) < 90 else 70):
        c.drawString(60, yy, line)
        yy -= 39 if len(title) < 90 else 31
    box_y = 80
    box_h = yy - box_y - 12
    if box_h < 250: box_h = 250
    c.setFillColor(white)
    c.roundRect(60, box_y, W-120, box_h, 22, stroke=0, fill=1)
    col_count = 2 if len(bullets) > 5 else 1
    col_w = (W-170) / col_count
    start_y = box_y + box_h - 42
    for i, b in enumerate(bullets):
        col = i % col_count
        row = i // col_count
        x = 92 + col * (col_w + 30)
        y = start_y - row * 58
        if y < box_y + 38: continue
        c.setFillColor(DEEP if i == 0 else LIGHT)
        c.roundRect(x, y-9, 22, 22, 6, stroke=0, fill=1)
        c.setFillColor(white if i == 0 else DEEP)
        c.setFont('Helvetica-Bold', 9)
        c.drawCentredString(x+11, y-2, str((i+1) if not appendix else ''))
        c.setFillColor(ANTH)
        c.setFont('Helvetica-Bold', 13)
        tx = x+34
        ty = y+1
        lines = wrap(str(b), 48 if col_count == 2 else 96)
        for ln in lines[:3]:
            c.drawString(tx, ty, ln)
            ty -= 15
    c.setFillColor(ANTH)
    c.setFont('Helvetica', 9)
    c.drawString(60, 34, 'Lenny Lanfrey - MBA Management International Business - 2026')
    c.drawRightString(W-60, 34, 'Backup PDF - static version')
    c.showPage()

c = canvas.Canvas(str(OUT), pagesize=(W,H))
for s in slides:
    draw_slide(c, s[0], s[1], s[2], s[3])
for s in annexes:
    draw_slide(c, s[0], s[1], s[2], s[3], appendix=True)
c.save()
print(OUT)
