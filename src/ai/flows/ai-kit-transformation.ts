
'use server';
/**
 * @fileOverview Un flujo de Genkit para generar el prompt de un cromo oficial.
 *
 * - transformPhotoWithKit - Función que devuelve el prompt final construido.
 * - AiKitTransformationInput - Tipo de entrada para la función.
 * - AiKitTransformationOutput - Tipo de salida para la función.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiKitTransformationInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "Una foto de la persona, como data URI en Base64. Formato: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  name: z.string().describe('Nombre del jugador'),
  team: z.string().describe('País de la selección nacional'),
  position: z.string().describe('Posición en el campo (arquero o jugador de campo)'),
  birth: z.string().describe('Fecha de nacimiento'),
  height: z.string().describe('Altura'),
  weight: z.string().describe('Peso'),
  club: z.string().describe('Club actual'),
});
export type AiKitTransformationInput = z.infer<typeof AiKitTransformationInputSchema>;

const AiKitTransformationOutputSchema = z.object({
  generatedPrompt: z
    .string()
    .describe('El prompt final construido dinámicamente para ser mostrado.'),
});
export type AiKitTransformationOutput = z.infer<typeof AiKitTransformationOutputSchema>;

function buildPrompt(d: AiKitTransformationInput) {
  const isArquero = d.position.toLowerCase().includes('arquero');
  
  const kit = isArquero
    ? `Camiseta de ARQUERO oficial de la Selección Nacional de fútbol de ${d.team} para el Mundial 2026:
  · Usar los colores oficiales de arquero de dicha selección (por ejemplo, el color flúor, negro o alternativo característico de su arquero titular actual).
  · Incluir el escudo oficial de la federación de fútbol de ${d.team} con sus estrellas oficiales correspondientes sobre el pecho (lado izquierdo del jugador).
  · Parche oficial de la FIFA sobre el pecho o mangas según corresponda.
  · Logo de la marca deportiva patrocinadora oficial actual de la selección de ${d.team} en el pecho.
  · La persona lleva guantes de arquero profesionales combinados con los colores del kit.`
    : `Camiseta TITULAR oficial de la Selección Nacional de fútbol de ${d.team} para el Mundial 2026:
  · Respetar el diseño clásico e histórico de la indumentaria titular (ej: rayas, colores sólidos, bastones o patrones icónicos que definen la identidad visual de ${d.team}).
  · Incluir el escudo oficial de la federación de fútbol de ${d.team} de forma nítida en el pecho (lado izquierdo del jugador) con sus estrellas oficiales si las tiene.
  · Parche oficial de la FIFA World Cup en el pecho.
  · Logo de la marca deportiva patrocinadora oficial actual de la selección de ${d.team} en el pecho.`;

  const pose = isArquero
    ? 'Encuadre de medio cuerpo, hombros y guantes parcialmente visibles, mirada concentrada hacia la cámara.'
    : 'Encuadre de medio cuerpo / busto, hombros incluidos, mirando ligeramente hacia la cámara.';

  // Lógica específica para destacar el apellido si es posible o simplemente seguir el formato solicitado
  const nameParts = d.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return `Generá una figurita coleccionable estilo Panini FIFA World Cup, manteniendo EXACTAMENTE este diseño visual fijo (no debe cambiar la estructura entre países):

DISEÑO FIJO DE LA FIGURITA (Estructura base):
- Formato vertical, proporción 3:4, bordes rectos nítidos de cromo físico.
- Fondo con un patrón geométrico o abstracto limpio en degradé sutil que combine armónicamente con los colores principales de la selección de ${d.team}, incorporando un número grande "26" en color claro semitransparente como marca de agua del Mundial 2026.
- Logo oficial estilizado de la "FIFA World Cup" arriba a la derecha en color blanco o dorado sutil.
- Bandera oficial de ${d.team} en posición vertical o integrada estéticamente sobre el lateral derecho del cromo.
- Plaqueta inferior estilizada con bordes redondeados conteniendo:
  · Nombre en mayúsculas: "${d.name}" (apellido destacado en negrita).
  · Línea con datos métricos: "${d.birth} | ${d.height} | ${d.weight}".
  · Sub-plaqueta con el club actual del jugador: "${d.club}".
- Logo "Panini" clásico en la esquina inferior derecha (rectángulo amarillo con texto azul).
- Iluminación frontal de estudio, estilo retrato de cromo deportivo, alta nitidez, look fotográfico oficial.

POSICIÓN: ${isArquero ? 'ARQUERO (goalkeeper)' : 'JUGADOR DE CAMPO'}.
SELECCIÓN NACIONAL A APLICAR: ${d.team}.

PERSONA (de la imagen de referencia adjunta):
- Usá el rostro y rasgos de la persona de la foto adjunta SIN ALTERARLOS (mantené identidad fiel, color de piel, peinado, vello facial, edad aparente).
- Vestila con la siguiente indumentaria oficial:
${kit}
- ${pose}
- Centrá a la persona en el diseño respetando las proporciones del cromo (rostro en el tercio superior, hombros perfectamente alineados sobre la plaqueta de datos).

REGLAS DURAS DE CONTROL:
- NO inventes ni alteres el rostro de la persona de la foto de origen.
- NO modifiques la estructura del cromo: la maquetación, fuentes tipográficas y posiciones de los elementos de texto deben ser idénticas sin importar el país.
- La indumentaria, escudo y bandera DEBEN corresponder estrictamente a la selección de ${d.team}.
- Si la posición es ARQUERO, la camiseta debe ser la de arquero oficial de ${d.team} (NUNCA el diseño de la camiseta titular de campo).
- Si la posición es JUGADOR DE CAMPO, la camiseta debe ser la titular tradicional de la selección de ${d.team} (NUNCA el diseño de arquero).
- Resultado final limpio en alta calidad, sin textos inventados o marcas espurias que no pertenezcan al diseño coleccionable descrito.`;
}

export async function transformPhotoWithKit(
  input: AiKitTransformationInput
): Promise<AiKitTransformationOutput> {
  return aiKitTransformationFlow(input);
}

const aiKitTransformationFlow = ai.defineFlow(
  {
    name: 'aiKitTransformationFlow',
    inputSchema: AiKitTransformationInputSchema,
    outputSchema: AiKitTransformationOutputSchema,
  },
  async (input) => {
    const dynamicPrompt = buildPrompt(input);
    return {
      generatedPrompt: dynamicPrompt,
    };
  }
);
