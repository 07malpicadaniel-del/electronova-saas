import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#722F37", "#4B5563", "#9CA3AF", "#5C4033", "#1F2937"];

export default function Stats({ data, theme }: { data: any; theme: any }) {
  return (
    <div className="space-y-6 pb-4">
      <div className={`${theme.cardBg} border ${theme.cardBorder} p-4 rounded-xl shadow-sm`}>
        <h3 className="text-md font-semibold mb-4">Rendimiento por Región</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.graficas.rendimiento_regional}>
              <XAxis dataKey="region" stroke={theme.text === "text-gray-200" ? "#9CA3AF" : "#4B5563"} fontSize={12} />
              <YAxis stroke={theme.text === "text-gray-200" ? "#9CA3AF" : "#4B5563"} fontSize={12} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1F2937', borderColor: '#5C4033', color: '#fff', borderRadius: '8px' }} />
              <Bar dataKey="ingresos" fill="#722F37" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`${theme.cardBg} border ${theme.cardBorder} p-4 rounded-xl shadow-sm`}>
        <h3 className="text-md font-semibold mb-4">Distribución</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data.graficas.distribucion_categorias} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="cantidad" nameKey="categoria" label>
                {data.graficas.distribucion_categorias.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#5C4033', color: '#fff', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}