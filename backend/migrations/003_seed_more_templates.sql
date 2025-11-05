INSERT INTO templates (id, name, description, preview_url, rules) VALUES
(
  'artigo_acad',
  'Artigo Acadêmico',
  'ABNT básico com títulos e corpo justificado',
  NULL,
  '{
    "metadata": {"category": "Acadêmico"},
    "paragraphStyles": {
      "Title": {"fontName":"Times New Roman","fontSize":18,"bold":true,"alignment":"center","lineSpacing":1.5},
      "Heading1": {"fontName":"Times New Roman","fontSize":16,"bold":true,"alignment":"left","lineSpacing":1.5},
      "Heading2": {"fontName":"Times New Roman","fontSize":14,"bold":true,"alignment":"left","lineSpacing":1.5},
      "Body": {"fontName":"Times New Roman","fontSize":12,"alignment":"justify","firstLineIndentCm":1.25,"lineSpacing":1.5}
    },
    "indentLevelsCm": {"heading_2":0.5},
    "listStyles": {"ordered":"List Number","unordered":"List Bullet"},
    "emphasis": {"uppercaseBoldKeywords":["IMPORTANTE"]}
  }'::jsonb
),
(
  'carta_comercial',
  'Carta Comercial',
  'Formato corporativo simples',
  NULL,
  '{
    "metadata": {"category": "Profissional"},
    "paragraphStyles": {
      "Title": {"fontName":"Arial","fontSize":16,"bold":true,"alignment":"center","lineSpacing":1.5},
      "Heading1": {"fontName":"Arial","fontSize":14,"bold":true,"alignment":"left"},
      "Body": {"fontName":"Arial","fontSize":12,"alignment":"left","lineSpacing":1.5}
    },
    "listStyles": {"ordered":"List Number","unordered":"List Bullet"}
  }'::jsonb
)
ON CONFLICT (id) DO NOTHING;









