from app.docx.generator import _apply_corrections


def test_apply_corrections_basic():
    text = "A Bicicreta é vermelha. A bicicleta é nova."
    out = _apply_corrections(text, [
        {"original": "Bicicreta", "correction": "Bicicleta"}
    ])
    assert "Bicicleta é vermelha" in out
    assert "bicicleta é nova" in out
