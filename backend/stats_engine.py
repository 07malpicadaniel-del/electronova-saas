import pandas as pd
import numpy as np

def generate_business_stats():
    """Genera y limpia los datos, retornando el JSON estructurado."""
    data = {
        'id_transaccion': [1001, 1002, 1003, 1004, 1005, 1006, 1006, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015],
        'fecha': ['15-01-2026', '16-01-2026', '16-01-2026', '17-01-2026', '17-01-2026', '18-01-2026', '18-01-2026', '19-01-2026', '20-01-2026', '21-01-2026', '21-01-2026', '22-01-2026', '23-01-2026', '24-01-2026', '25-01-2026'],
        'region': ['Norte', 'Sur', 'Norte', 'Este', 'Oeste', 'Norte', 'Norte', 'Sur', 'Este', 'Norte', 'Sur', 'Oeste', 'Este', 'Norte', 'Sur'],
        'categoria': ['Laptops', 'Smartphones', 'Tablets', 'Laptops', None, 'Smartphones', 'Smartphones', 'Audio', 'Laptops', 'Tablets', 'Audio', 'Smartphones', None, 'Laptops', 'Tablets'],
        'precio_unitario': [1200.50, 800.00, 300.00, 1200.50, 150.00, 800.00, 800.00, 120.00, 1200.50, np.nan, 120.00, 800.00, 450.00, 1200.50, 300.00],
        'cantidad': [2, 5, 10, 1, 4, 3, 3, 15, 2, 8, 20, 4, 2, 1, 6]
    }
    df = pd.DataFrame(data)

    df = df.drop_duplicates().copy()
    df['categoria'] = df['categoria'].fillna('Desconocido')
    df['precio_unitario'] = df['precio_unitario'].fillna(df['precio_unitario'].median())
    df['ingreso_total'] = df['precio_unitario'] * df['cantidad']

    desempeno_region = df.groupby('region').agg(
        ingresos=('ingreso_total', 'sum'),
        transacciones=('id_transaccion', 'count')
    ).reset_index().sort_values(by='ingresos', ascending=False)
    
    frecuencia_categorias = df['categoria'].value_counts().reset_index()
    frecuencia_categorias.columns = ['categoria', 'cantidad']

    kpis = {
        "ingreso_total": float(df['ingreso_total'].sum()),
        "ticket_promedio": float(df['ingreso_total'].mean()),
        "transacciones_validas": int(len(df)),
        "producto_top": frecuencia_categorias.iloc[0]['categoria']
    }

    return {
        "kpis": kpis,
        "graficas": {
            "rendimiento_regional": desempeno_region.to_dict(orient='records'),
            "distribucion_categorias": frecuencia_categorias.to_dict(orient='records')
        }
    }