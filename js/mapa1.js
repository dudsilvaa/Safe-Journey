// Iniciando a plataforma HERE com a minha chave de API
var platform = new H.service.Platform({
    'apikey': 'X2Kyj2pmTI3V9hUK0SzC7dLh0qQRK3-v29YDv8SDXaI'
});
  
var defaultLayers = platform.createDefaultLayers();
  
// Criar e mostrar o mapa
var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
      zoom: 19,
      center: { lat: -22.9150300499488, lng: -47.05593111434799 }
    }
);
  
// Criar o UI do mapa
const ui = H.ui.UI.createDefault(map, defaultLayers);
  
// Criar os ícones marcadores
function createMarkerIcon(color) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32">
      <path d="M12 0C6.48 0 2 4.48 2 10c0 5.057 3.333 14.5 10 22 6.667-7.5 10-16.943 10-22 0-5.52-4.48-10-10-10zm0 14c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" 
      fill="${color}" stroke="#FFFFFF"/>
    </svg>`;
}
  
// Definir as cores dos marcadores
const startColor = "#00008B";
const stopoverColor = "#8AC9C9";
const splitColor = "#A2EDE7";
const endColor = "#990000";
  
// Criar os ícones com suas respectivas cores
const startIcon = new H.map.Icon(createMarkerIcon(startColor));
const stopoverIcon = new H.map.Icon(createMarkerIcon(stopoverColor));
const endIcon = new H.map.Icon(createMarkerIcon(endColor));
const splitIcon = new H.map.Icon(createMarkerIcon(splitColor));
  
// Criar a ferramenta da medição de distância
const distanceMeasurementTool = new H.ui.DistanceMeasurement({
    startIcon: startIcon,
    stopoverIcon: stopoverIcon,
    endIcon: endIcon,
    splitIcon: splitIcon,
    lineStyle: {
      strokeColor: "rgba(95, 229, 218, 0.5)",
      lineWidth: 6
    },
    alignment: H.ui.LayoutAlignment.RIGHT_BOTTOM
});
  
// Adicionar a ferramenta de controle de distância ao UI
ui.addControl("distancemeasurement", distanceMeasurementTool);

// Permitir que o usuário interaja com o mapa (mover e dar zoom com o mouse)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));