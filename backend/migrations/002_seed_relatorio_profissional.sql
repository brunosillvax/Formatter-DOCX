INSERT INTO templates (id, name, description, preview_url, rules)
VALUES (
  'relatorio_prof',
  'Relatório Profissional',
  'Template com hierarquia de títulos, rótulos-chave e ênfases.',
  NULL,
  $$
  {
    "paragraphStyles": {
      "Title": {"fontName": "Arial", "fontSize": 18, "bold": true, "alignment": "center", "lineSpacing": 1.5},
      "Heading1": {"fontName": "Arial", "fontSize": 16, "bold": true, "alignment": "left", "lineSpacing": 1.5},
      "Heading2": {"fontName": "Arial", "fontSize": 14, "bold": true, "alignment": "left", "lineSpacing": 1.5},
      "Heading3": {"fontName": "Arial", "fontSize": 12, "bold": true, "alignment": "left", "lineSpacing": 1.5},
      "Body": {"fontName": "Arial", "fontSize": 12, "alignment": "justify", "firstLineIndentCm": 1.25, "lineSpacing": 1.5},
      "KeyLabel": {"fontName": "Arial", "fontSize": 12, "bold": true, "alignment": "left"}
    },
    "indentLevelsCm": {
      "heading_2": 0.5,
      "heading_3": 1.0
    },
    "emphasis": {
      "uppercaseBoldKeywords": ["INVIÁVEL", "NÃO RECOMENDADO"]
    },
    "listStyles": {
      "ordered": "List Number",
      "unordered": "List Bullet"
    }
  }
  $$::jsonb
)
ON CONFLICT (id) DO NOTHING;




