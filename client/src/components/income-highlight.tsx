export default function IncomeHighlight() {
  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Potencial de Renda Real</h2>
          <p className="text-gray-600">Dados baseados na performance atual dos agentes CVC</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">4-6h</span>
              </div>
              <div className="text-gray-900 text-2xl font-bold mb-2">R$ 4.500</div>
              <div className="text-gray-600 text-sm font-medium mb-1">18 pacotes vendidos</div>
              <div className="text-gray-500 text-xs">Meio período</div>
            </div>
            <div className="text-center relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-cvc-blue text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Mais comum
                </span>
              </div>
              <div className="w-16 h-16 bg-cvc-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-cvc-blue font-bold text-xl">6-8h</span>
              </div>
              <div className="text-cvc-blue text-2xl font-bold mb-2">R$ 6.000</div>
              <div className="text-gray-600 text-sm font-medium mb-1">24 pacotes vendidos</div>
              <div className="text-gray-500 text-xs">Período regular</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-cvc-blue font-bold text-xl">8h+</span>
              </div>
              <div className="text-gray-900 text-2xl font-bold mb-2">R$ 7.500+</div>
              <div className="text-gray-600 text-sm font-medium mb-1">30+ pacotes vendidos</div>
              <div className="text-gray-500 text-xs">Dedicação integral</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
