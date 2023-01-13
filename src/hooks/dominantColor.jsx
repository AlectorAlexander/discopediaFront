import { useState, useEffect } from 'react';

export function useDominantColors(imageUrl) {
    const [dominantColors, setDominantColors] = useState([]);
    useEffect(() => {
    // Cria um canvas para desenhar a imagem
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // Carrega a imagem
        var image = new Image();
        image.src = imageUrl;
        image.onload = function() {
            // Define o tamanho do canvas como o tamanho da imagem
            canvas.width = image.width;
            canvas.height = image.height;
            // Desenha a imagem no canvas
            ctx.drawImage(image, 0, 0, image.width, image.height);
            // Obtém os dados da imagem
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var pixels = imageData.data;
            // Armazena as ocorrências de cada cor
            var colorCount = {};
            for (var i = 0; i < pixels.length; i += 4) {
                // Converte os valores de cor de RGBA para HEX
                var color = '#' + ('000000' + rgbToHex(pixels[i], pixels[i + 1], pixels[i + 2])).slice(-6);
                // Adiciona a cor ao contador
                if (colorCount[color]) {
                    colorCount[color]++;
                } else {
                    colorCount[color] = 1;
                }
            }
            // Ordena as cores baseado no número de ocorrências
            var sortedColors = Object.keys(colorCount).sort(function(a, b) {
                return colorCount[b] - colorCount[a];
            });
            // As cores dominantes são as primeiras na lista ordenada
            var dominantColors = sortedColors.slice(0, 5);
            setDominantColors(dominantColors);
        };
    }, [imageUrl]);
    return dominantColors;
}
            
// Converte valores de cor RGB para HEX
function rgbToHex(r, g, b) {
    return ((r << 16) | (g << 8) | b).toString(16);
}
       
