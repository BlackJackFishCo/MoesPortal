import { createContext, useContext, useState } from "react";

// Lightweight dictionary-based i18n: rather than restructuring every piece of
// training content into { en, es } objects, we keep the English strings as
// the single source of truth in the data/JSX and look up a Spanish
// replacement by exact string match here. Call t("Some English text") at any
// render site that should be translated; unmapped strings just pass through
// untranslated, so a typo in a lookup never breaks the page.
//
// Deliberately left in English everywhere (per Sterling's direction):
// brand/menu terms (Moe's, Homewrecker, Stack, BYO, etc.), the position
// callouts (HOT, COLD, SWING, RING, LINEBACKER, CATERING), operational
// jargon (STIR FLIP WIPE, ORANGE stickers, POS, OLO, EZ Cater), store/
// district names, and every linked PDF/video title (the underlying files
// are English-only, so translating just the button label would be
// misleading). The Admin Panel is an internal manager tool and stays
// English-only.

export const LanguageContext = createContext({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem("moes_lang") === "es" ? "es" : "en"; } catch { return "en"; }
  });
  function setLang(l) {
    setLangState(l);
    try { localStorage.setItem("moes_lang", l); } catch {}
  }
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useT() {
  const { lang } = useLanguage();
  return (s) => (lang === "es" && Object.prototype.hasOwnProperty.call(ES, s) ? ES[s] : s);
}

function LanguageToggle({ compact }) {
  const { lang, setLang } = useLanguage();
  const btn = (code) => ({
    background: lang === code ? "#E8541A" : "transparent",
    color: lang === code ? "#fff" : "#999",
    border: `1.5px solid ${lang === code ? "#E8541A" : "#555"}`,
    borderRadius: 6,
    padding: compact ? "5px 10px" : "6px 14px",
    fontSize: compact ? 12 : 13,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "Calibri, sans-serif",
  });
  return (
    <div style={{ display: "flex", gap: 6 }}>
      <button type="button" onClick={() => setLang("en")} style={btn("en")}>EN</button>
      <button type="button" onClick={() => setLang("es")} style={btn("es")}>ES</button>
    </div>
  );
}

export { LanguageToggle };

// English source string -> Spanish translation.
const ES = {
  // ── Login screen ──────────────────────────────────────────────────────
  "Enter your info to get started": "Ingresa tu información para comenzar",
  "FULL NAME": "NOMBRE COMPLETO",
  "First and Last Name": "Nombre y Apellido",
  "YOUR STORE": "TU TIENDA",
  "Select your store...": "Selecciona tu tienda...",
  "BEGIN TRAINING": "COMENZAR CAPACITACIÓN",
  "Starting...": "Comenzando...",
  "No password required. Your progress is saved automatically by your name and store.":
    "No se requiere contraseña. Tu progreso se guarda automáticamente con tu nombre y tienda.",
  "Admin Access": "Acceso de Administrador",
  "Please enter your full name (first and last).": "Por favor ingresa tu nombre completo (nombre y apellido).",
  "Please select your store.": "Por favor selecciona tu tienda.",

  // ── Top header / nav ──────────────────────────────────────────────────
  "Training Portal": "Portal de Capacitación",
  "Sign Out": "Cerrar Sesión",
  "History": "Historia",
  "Orientation": "Orientación",
  "Food Safety": "Seguridad Alimentaria",
  "Training": "Capacitación",
  "Resources": "Recursos",
  "Done": "Completado",
  "Complete!": "¡Completo!",

  // ── Page descriptions (PAGES.description) ──────────────────────────────
  "Welcome to Moe's! From the second you walk into a Moe's, you'll notice there's something different. You actually feel welcome. Ever since employees at the first location in Atlanta, GA in 2000 shouted \"Welcome to Moe's!\" – that phrase has embodied our entire culture. Everybody is welcome at Moe's, including garage band superstars. Founded in Atlanta in 2000, Moe's now operates over 500 franchise locations across the country.":
    "¡Bienvenido a Moe's! Desde el segundo en que entras a un Moe's, notarás que hay algo diferente. Realmente te sientes bienvenido. Desde que los empleados de la primera ubicación en Atlanta, GA en el año 2000 gritaron \"Welcome to Moe's!\" — esa frase ha representado toda nuestra cultura. Todos son bienvenidos en Moe's, incluyendo las superestrellas de bandas de garaje. Fundado en Atlanta en 2000, Moe's ahora opera más de 500 ubicaciones de franquicia en todo el país.",
  "Welcome to Moe's! Congratulations! We're excited to have you join our team. The Orientation page will get you oriented to your new role at Moe's. Policies, expectations, dress code, scheduling, and everything you need before your first shift. These resources will always be available here for reference later. As a company, our PURPOSE is to help people realize and achieve their dreams. Our Mission includes Developing People, Running Great Restaurants, and Acquiring Restaurants. In order to do all three, we must be EXCELLENT at training. We want to help you grow, and this training is the first step.":
    "¡Bienvenido a Moe's! ¡Felicidades! Estamos emocionados de que te unas a nuestro equipo. La página de Orientación te ayudará a orientarte en tu nuevo puesto en Moe's. Políticas, expectativas, código de vestimenta, horarios, y todo lo que necesitas antes de tu primer turno. Estos recursos siempre estarán disponibles aquí para consultarlos más adelante. Como empresa, nuestro PROPÓSITO es ayudar a las personas a realizar y alcanzar sus sueños. Nuestra Misión incluye Desarrollar a las Personas, Operar Excelentes Restaurantes, y Adquirir Restaurantes. Para lograr las tres, debemos ser EXCELENTES en la capacitación. Queremos ayudarte a crecer, y esta capacitación es el primer paso.",
  "This section will review food safety practices you will need to know before serving food to guests. Safety of our food, employees and guests is a top priority. Please review the videos below to complete this Food Safety module.":
    "Esta sección repasará las prácticas de seguridad alimentaria que necesitas conocer antes de servir comida a los clientes. La seguridad de nuestra comida, empleados y clientes es una prioridad absoluta. Por favor revisa los videos a continuación para completar este módulo de Seguridad Alimentaria.",
  "Station-by-station training overview covering the Menu, Hot, Cold, Swing, Ring, and Station Prep positions. Complete the checklist after each section. This training material is always available for reference later. Have your manager verify you have mastered each position on shift to become Sterling Certified and earn your Blue Certification hat.":
    "Repaso de capacitación estación por estación que cubre los puestos de Menu, HOT, COLD, SWING, RING, y Station Prep. Completa la lista de verificación después de cada sección. Este material de capacitación siempre estará disponible para consultarlo más adelante. Pide a tu gerente que verifique que has dominado cada puesto en turno para convertirte en Sterling Certified y ganar tu gorra de Certificación Azul.",
  "Quick-access library for reference documents, contact lists, HR forms, and ongoing learning materials. Always available to you.":
    "Biblioteca de acceso rápido para documentos de referencia, listas de contactos, formularios de recursos humanos, y materiales de aprendizaje continuo. Siempre disponible para ti.",

  // ── History page extras ─────────────────────────────────────────────────
  "Welcome to Moe's!": "¡Bienvenido a Moe's!",
  "ALWAYS AVAILABLE": "SIEMPRE DISPONIBLE",
  "Sterling Restaurants": "Sterling Restaurants",
  "Sterling Restaurants, LLC is the largest franchisee of Moe's Southwest Grills. In July 2009, CEO Mark Monroe founded Sterling Restaurants and acquired the very first Moe's location on earth! Peachtree – store #1 in Atlanta, GA. In 2016 Sterling was named \"Franchisee of the Year\" by the International Franchise Association. Sterling then embarked on a major acquisition strategy in 2017 and 2018, purchasing over 30 additional locations across Florida, Georgia, and the Carolinas. In 2023, Sterling invested heavily in store modernizations, revamping beverage stations with slushies and seasonal lemonades, new sauces, salsas, and driving double-digit sales comps. Sterling has been named Franchise of the Year from Go To Food Brands for the last 10 years. Today, Sterling owns and operates nearly 90 Moe's locations across Florida, Georgia, Alabama, New Jersey, New York, North Carolina, and South Carolina.":
    "Sterling Restaurants, LLC es el franquiciado más grande de Moe's Southwest Grills. En julio de 2009, el CEO Mark Monroe fundó Sterling Restaurants y adquirió la primerísima ubicación de Moe's en el mundo! Peachtree — tienda #1 en Atlanta, GA. En 2016 Sterling fue nombrado \"Franquiciado del Año\" por la Asociación Internacional de Franquicias. Sterling luego emprendió una importante estrategia de adquisición en 2017 y 2018, comprando más de 30 ubicaciones adicionales en Florida, Georgia, y las Carolinas. En 2023, Sterling invirtió fuertemente en modernizaciones de tiendas, renovando las estaciones de bebidas con slushies y limonadas de temporada, nuevas salsas, y logrando comparables de ventas de dos dígitos. Sterling ha sido nombrado Franquicia del Año por Go To Food Brands durante los últimos 10 años. Hoy, Sterling posee y opera casi 90 ubicaciones de Moe's en Florida, Georgia, Alabama, Nueva Jersey, Nueva York, Carolina del Norte, y Carolina del Sur.",
  "Orientation Videos": "Videos de Orientación",
  "Food Safety Videos": "Videos de Seguridad Alimentaria",
  "Welcome To Moe's Videos": "Videos de Bienvenida a Moe's",
  "Additional Training Resources": "Recursos de Capacitación Adicionales",
  "Now playing — click to collapse": "Reproduciendo ahora — haz clic para contraer",
  "Click to watch": "Haz clic para ver",

  // ── Module completion block (shared across all pages) ──────────────────
  "Ready to mark this module complete?": "¿Listo para marcar este módulo como completo?",
  "By checking the box below, you confirm you have reviewed all materials and videos in this section.":
    "Al marcar la casilla a continuación, confirmas que has revisado todos los materiales y videos de esta sección.",
  "I have reviewed all materials and videos for": "He revisado todos los materiales y videos de",
  "MARK AS COMPLETE": "MARCAR COMO COMPLETO",
  "Module Complete!": "¡Módulo Completo!",
  "You completed this on": "Completaste esto el",
  "You completed this earlier.": "Completaste esto anteriormente.",
  "You can always review this content.": "Siempre puedes repasar este contenido.",

  // ── Orientation notes ────────────────────────────────────────────────────
  "Notes": "Notas",
  "Check each box as your trainer reviews it with you. All": "Marca cada casilla mientras tu capacitador la repasa contigo. Se deben marcar las",
  "must be checked to complete this module.": "para completar este módulo.",
  "checked": "marcadas",
  "Complete to Unlock Food Safety": "Completa para Desbloquear Seguridad Alimentaria",
  "You must check all": "Debes marcar las",
  "Notes boxes above before completing this module.": "casillas de Notas de arriba antes de completar este módulo.",
  "All notes checked! Marking this module complete...": "¡Todas las notas marcadas! Marcando este módulo como completo...",
  "Reviewed Sterling Handbook.": "Manual de Sterling revisado.",
  "Received Swag Bag and Uniforms.": "Bolsa de bienvenida y uniformes recibidos.",
  "Understand Uniform Standards including slip resistant shoe requirement.":
    "Comprende las Normas de Uniforme incluyendo el requisito de zapatos antideslizantes.",
  "Understand tip share distribution and pay days.": "Comprende la distribución de propinas compartidas y los días de pago.",
  "Understand crew member referral bonus program.": "Comprende el programa de bono por referido de empleados.",
  "Reviewed Moe's career progression chart.": "Tabla de progresión de carrera de Moe's revisada.",
  "Reviewed Employee meal benefit and location for employee drinks.":
    "Beneficio de comida para empleados y ubicación de bebidas para empleados revisados.",
  "Reviewed Schedule location, how to request days off, process for switching shifts.":
    "Ubicación del horario, cómo solicitar días libres, y el proceso para cambiar turnos revisados.",
  "POS log in number.": "Número de inicio de sesión del POS.",
  "Store Safety, Chemicals, Back Door, Cash, and Closing Procedures.":
    "Seguridad de la tienda, químicos, puerta trasera, efectivo, y procedimientos de cierre.",
  "Assigned to store group chat.": "Asignado al chat grupal de la tienda.",
  "Restaurant tour with manager.": "Recorrido del restaurante con el gerente.",

  // ── Training page / Star Tracker ────────────────────────────────────────
  "Position Training": "Capacitación por Puesto",
  "positions completed": "puestos completados",
  "INCOMPLETE": "INCOMPLETO",
  "✓ COMPLETED": "✓ COMPLETADO",
  "Complete": "Completo",
  "All Positions Completed!": "¡Todos los Puestos Completados!",
  "Menu": "Menu",
  "Hot": "HOT",
  "Cold": "COLD",
  "Swing": "SWING",
  "Ring": "RING",
  "Guest Line of Sight": "Guest Line of Sight",
  "Catering": "CATERING",
  "✅ Completed": "✅ Completado",
  "Watch and check off all training videos below to mark this section complete":
    "Mira y marca todos los videos de capacitación abajo para completar esta sección",
  "Watch the training videos below, then check off every checklist item to mark this position complete":
    "Mira los videos de capacitación abajo, luego marca cada elemento de la lista de verificación para completar este puesto",
  "Check off every checklist item below to mark this position complete":
    "Marca cada elemento de la lista de verificación abajo para completar este puesto",
  "Position Overview": "Resumen del Puesto",
  "Photo placeholder": "Espacio para foto",
  "✕ Close": "✕ Cerrar",
  "Example Catering Set Up": "Ejemplo de Montaje de Catering",
  "I have watched all Menu training videos and completed this section.":
    "He visto todos los videos de capacitación de Menu y completado esta sección.",
  "I have reviewed the Guest Line of Sight guidelines and completed this section.":
    "He revisado las pautas de Guest Line of Sight y completado esta sección.",
  "Checklist for": "Lista de Verificación de",
  "checked off": "marcados",
  "Check off every item to mark this position complete": "Marca cada elemento para completar este puesto",
  "All items checked —": "Todos los elementos marcados —",
  "complete!": "completo!",

  // ── Position overviews ───────────────────────────────────────────────────
  "This position is the first position the guest interacts with. The HOT person should have high energy and is the starter for the entire burrito line. They are in charge of the HOT ingredients on the burrito line, cleanliness, organization, and starting the guest experience.":
    "Este es el primer puesto con el que interactúa el cliente. La persona de HOT debe tener mucha energía y es quien inicia toda la línea de burritos. Está a cargo de los ingredientes de HOT en la línea, la limpieza, la organización, y de comenzar la experiencia del cliente.",
  "This position is in charge of all COLD ingredients going down the burrito line, Rolling burritos, cleanliness, organization, and maintaining the guest experience":
    "Este puesto está a cargo de todos los ingredientes de COLD que van por la línea de burritos, enrollar burritos, la limpieza, la organización, y mantener la experiencia del cliente",
  "This position is in charge of making the line move from HOT/COLD to the register, upselling queso, packaging nicely, and making sure items and stickers are properly accounted for to the RING position.":
    "Este puesto está a cargo de hacer que la línea avance de HOT/COLD hacia la caja, promover la venta de queso, empacar prolijamente, y asegurarse de que los artículos y las etiquetas queden correctamente contabilizados para el puesto de RING.",
  "This position is the last person the guest interacts with on the burrito line. This position is in charge of ringing up guest correctly in the POS register, collecting money, upselling drinks, organizing and confirming accuracy of OLO and delivery orders.":
    "Este puesto es la última persona con la que interactúa el cliente en la línea de burritos. Este puesto está a cargo de cobrar correctamente al cliente en la caja POS, recibir el dinero, promover la venta de bebidas, y organizar y confirmar la exactitud de los pedidos de OLO y entrega.",
  "The GUEST LINE OF SIGHT is the view the guest sees. (Dining room, Salsa Bar, Beverage Bar, Patio, and Restrooms) Keeping all these areas clean, stocked, and free from hazards is crucial. Looking at all areas through the eyes of the guest helps us make sure the guest receives a great experience and will return to Moe's soon.":
    "El GUEST LINE OF SIGHT es la vista que ve el cliente. (Comedor, Salsa Bar, Beverage Bar, Patio, y Baños) Mantener todas estas áreas limpias, abastecidas, y libres de peligros es crucial. Observar todas las áreas a través de los ojos del cliente nos ayuda a asegurarnos de que el cliente reciba una excelente experiencia y regrese pronto a Moe's.",
  "This position delivers our catering orders on time and sets them up for the guest to enjoy. This position must have a clean driving record and the ability to problem solve as spaces are sometimes limited to set up in. This position also has to follow specific guidelines for delivering EZ cater orders.":
    "Este puesto entrega nuestros pedidos de catering a tiempo y los prepara para que el cliente los disfrute. Este puesto debe tener un historial de manejo limpio y la capacidad de resolver problemas, ya que a veces el espacio para armar el montaje es limitado. Este puesto también debe seguir pautas específicas para la entrega de pedidos de EZ Cater.",

  // ── Position checklists ──────────────────────────────────────────────────
  "Each guest that enters gets a cheerful “Welcome to Moe’s” from the HOT position.":
    "Cada cliente que entra recibe un alegre “Welcome to Moe’s” del puesto de HOT.",
  "HOT position uses ORANGE stickers to correctly label all proteins and upcharges. Upcharges include White Meat Chicken, Steak, LTO Proteins, Queso, Bacon, and Guacamole.":
    "El puesto de HOT usa etiquetas ORANGE para etiquetar correctamente todas las proteínas y cargos adicionales. Los cargos adicionales incluyen White Meat Chicken, Steak, proteínas LTO, Queso, Bacon, y Guacamole.",
  "HOT position is knowledgeable of our menu and suggestively sells the Moe Value Meal.":
    "El puesto de HOT conoce bien nuestro menú y sugiere activamente el Moe Value Meal.",
  "HOT person should be able to pass a HOT catch weight test for all proteins.":
    "La persona de HOT debe poder aprobar una prueba de peso (catch weight) de HOT para todas las proteínas.",
  "HOT position practices STIR, FLIP, WIPE during all down times to keep the HOT line clean, stocked, and looking fresh.":
    "El puesto de HOT practica STIR, FLIP, WIPE durante todos los tiempos muertos para mantener la línea de HOT limpia, abastecida, y con buen aspecto.",
  "Each guest that enters gets a cheerful “Welcome to Moe’s” from the COLD position.":
    "Cada cliente que entra recibe un alegre “Welcome to Moe’s” del puesto de COLD.",
  "COLD position starts by asking each guest if they would like Lettuce, Pico, and Cheese. These are the three main ingredients in all items and helps keep the line moving quickly.":
    "El puesto de COLD comienza preguntando a cada cliente si desea Lettuce, Pico, y Cheese. Estos son los tres ingredientes principales en todos los artículos y ayudan a mantener la línea avanzando rápido.",
  "COLD position uses the ORANGE stickers to label all upcharges for Queso and Guac.":
    "El puesto de COLD usa las etiquetas ORANGE para etiquetar todos los cargos adicionales de Queso y Guac.",
  "COLD position puts Quesadillas, Stacks, Dippers on the grill or press.":
    "El puesto de COLD coloca Quesadillas, Stacks, y Dippers en la parrilla o la prensa.",
  "COLD position practices STIR, FLIP, WIPE during all down times to keep the COLD line clean, stocked, and looking fresh.":
    "El puesto de COLD practica STIR, FLIP, WIPE durante todos los tiempos muertos para mantener la línea de COLD limpia, abastecida, y con buen aspecto.",
  "Each guest that enters gets a cheerful “Welcome to Moe’s” from the SWING position.":
    "Cada cliente que entra recibe un alegre “Welcome to Moe’s” del puesto de SWING.",
  "SWING position is always upselling Queso. You can get a Side = 3.25oz, Cup = 6oz, or Bowl = 12oz.":
    "El puesto de SWING siempre promueve la venta de Queso. Se puede pedir un Side = 3.25oz, Cup = 6oz, o Bowl = 12oz.",
  "SWING position asks every guest if they would like chips. Dine in orders get 1 scoop, Togo orders get two scoops per entree. Chips are always free and we will give a refill happily.":
    "El puesto de SWING le pregunta a cada cliente si desea chips. Los pedidos para comer en el local reciben 1 porción, los pedidos para llevar reciben dos porciones por plato. Los chips siempre son gratis y con gusto damos una recarga.",
  "SWING position double checks all OLO / 3rd party delivery orders for accuracy.":
    "El puesto de SWING verifica dos veces todos los pedidos de OLO / entrega de terceros para asegurar su exactitud.",
  "SWING position bags each menu entree separately and closes the bag with one crisp fold.":
    "El puesto de SWING empaca cada plato del menú por separado y cierra la bolsa con un doblez limpio.",
  "Each guest that enters gets a cheerful “Welcome to Moe’s” from the RING position.":
    "Cada cliente que entra recibe un alegre “Welcome to Moe’s” del puesto de RING.",
  "The RING person is responsible for asking every guest for their phone number to be entered into the text database for exclusive discounts and offers.":
    "La persona de RING es responsable de pedirle a cada cliente su número de teléfono para ingresarlo en la base de datos de mensajes de texto para descuentos y ofertas exclusivas.",
  "RING position correctly charges each guest including all ORANGE sticker add ons and upcharges.":
    "El puesto de RING cobra correctamente a cada cliente, incluyendo todos los complementos y cargos adicionales de etiquetas ORANGE.",
  "RING position ensures OLOs / 3rd party orders go to the correct people by checking names on phones.":
    "El puesto de RING se asegura de que los pedidos de OLO / terceros lleguen a las personas correctas verificando los nombres en los teléfonos.",
  "RING position is responsible for keeping the POS area neat and clutter free.":
    "El puesto de RING es responsable de mantener el área del POS ordenada y libre de desorden.",
  "Each guest that enters gets a cheerful “Welcome to Moe’s” from the LINEBACKER position.":
    "Cada cliente que entra recibe un alegre “Welcome to Moe’s” del puesto de LINEBACKER.",
  "LINEBACKER position ensures chicken is cooked to 165 degrees and logs into the Chicken Log Book.":
    "El puesto de LINEBACKER se asegura de que el pollo esté cocido a 165 grados y lo registra en el Chicken Log Book.",
  "LINEBACKER position cuts proteins into consistent ½” by ½” inch cubes.":
    "El puesto de LINEBACKER corta las proteínas en cubos consistentes de ½” por ½” de pulgada.",
  "LINEBACKER position keeps an eye on the HOT and COLD line to restock low items before they run out.":
    "El puesto de LINEBACKER vigila la línea de HOT y COLD para reabastecer los artículos bajos antes de que se agoten.",
  "LINEBACKER position assists HOT and COLD position with STIR, FLIP, WIPE during down time to keep the lines clean, stocked, and looking fresh.":
    "El puesto de LINEBACKER ayuda a los puestos de HOT y COLD con STIR, FLIP, WIPE durante los tiempos muertos para mantener las líneas limpias, abastecidas, y con buen aspecto.",
  "CATERING DRIVERS make sure they leave the store with all of the items on the pack list and on time.":
    "Los CATERING DRIVERS se aseguran de salir de la tienda con todos los artículos de la lista de empaque y a tiempo.",
  "CATERING drivers represent Moe’s and drive safely to and from all caterings as well as keeping the catering van clean and gassed up for the next delivery.":
    "Los conductores de CATERING representan a Moe's y conducen de forma segura hacia y desde todos los caterings, además de mantener la camioneta de catering limpia y con combustible para la siguiente entrega.",
  "CATERING drivers set up each catering in the same order as the instore HOT and COLD line for the guest.":
    "Los conductores de CATERING arman cada catering en el mismo orden que la línea de HOT y COLD dentro de la tienda para el cliente.",
  "CATERING drivers must take a picture immediately after catering is set up and post in the store's catering group. This time stamps the delivery setup and also gives us a record of what was delivered.":
    "Los conductores de CATERING deben tomar una foto inmediatamente después de armar el catering y publicarla en el grupo de catering de la tienda. Esto marca la hora del montaje de la entrega y también nos da un registro de lo que se entregó.",
  "CATERING driver must follow EZ Cater protocols for all EZ Cater deliveries.":
    "El conductor de CATERING debe seguir los protocolos de EZ Cater para todas las entregas de EZ Cater.",

  // ── Guest Line of Sight (Ambassador) wrong/right ────────────────────────
  "Wrong vs. Right — Guest Area Visuals": "Incorrecto vs. Correcto — Visuales del Área del Cliente",
  "✕ Wrong": "✕ Incorrecto",
  "✓ Right": "✓ Correcto",
  "Parking Lot & Exterior": "Estacionamiento y Exterior",
  "Trash is scattered across the parking lot, sidewalks, or entrance, the marketing signs are crooked or full of bubbles, the exterior windows and sills are dirty, or the exterior sign isn't lit correctly at night. If any of this is wrong, correct what you can or let a manager know right away so we can get it fixed.":
    "Hay basura esparcida en el estacionamiento, las aceras, o la entrada, los carteles publicitarios están torcidos o llenos de burbujas, las ventanas y repisas exteriores están sucias, o el letrero exterior no está bien iluminado de noche. Si algo de esto está mal, corrige lo que puedas o avísale a un gerente de inmediato para que se pueda arreglar.",
  "Each employee entering the building checks for trash on the way in to make sure the sidewalks and entrance look clean. The marketing signs are straight and not full of bubbles, the exterior windows and sills are clean, and at night the exterior sign is lit correctly — this is our first impression from the guest!":
    "Cada empleado que entra al edificio revisa si hay basura al entrar para asegurarse de que las aceras y la entrada se vean limpias. Los carteles publicitarios están derechos y sin burbujas, las ventanas y repisas exteriores están limpias, y de noche el letrero exterior está bien iluminado — ¡esta es nuestra primera impresión ante el cliente!",
  "Front Door": "Puerta Principal",
  "The door glass is smudged with fingerprints and the floor mats have dirt and debris tracked in from outside.":
    "El vidrio de la puerta está manchado con huellas dactilares y los tapetes tienen tierra y residuos arrastrados desde afuera.",
  "The door glass is streak-free and clear, and the floor mats are clean and laying flat, giving guests a bright, welcoming entrance.":
    "El vidrio de la puerta está sin marcas y transparente, y los tapetes están limpios y bien colocados, dando a los clientes una entrada luminosa y acogedora.",
  "Down the Line": "A lo Largo de la Línea",
  "The sneeze guards are smudged and splattered, the line is cluttered with extra pans and tools, and Stir, Flip, Wipe isn't being practiced during down time.":
    "Los protectores contra estornudos están manchados y salpicados, la línea está desordenada con bandejas y herramientas de más, y no se está practicando Stir, Flip, Wipe durante los tiempos muertos.",
  "The sneeze guards are spotless, the line is free of clutter and not over stocked with paper products or excessive tortillas.":
    "Los protectores contra estornudos están impecables, la línea está libre de desorden y no tiene un exceso de productos de papel o tortillas.",
  "The line is stocked and clean. Team is actively practicing STIR, FLIP, WIPE to keep food fresh and hot!":
    "La línea está abastecida y limpia. El equipo está practicando activamente STIR, FLIP, WIPE para mantener la comida fresca y caliente!",
  "Register Area": "Área de Caja",
  "The register area is cluttered with extra cups, bags, and supplies piled up, and it's overstocked well beyond what's needed for the shift.":
    "El área de caja está desordenada con vasos, bolsas, y suministros extra apilados, y está sobreabastecida mucho más allá de lo necesario para el turno.",
  "The register area is clutter-free and stocked only with what's needed for the shift, keeping the space organized and easy for the team to work in.":
    "El área de caja está libre de desorden y abastecida solo con lo necesario para el turno, manteniendo el espacio organizado y fácil de trabajar para el equipo.",
  "Salsa Bar": "Salsa Bar",
  "The sneeze guard is dirty, salsa spills are left uncleaned, the bar is running low, spoodles are crusted with old salsa, and souffle cups or lids are out of stock.":
    "El protector contra estornudos está sucio, hay derrames de salsa sin limpiar, la barra tiene poco abasto, los spoodles tienen salsa vieja pegada, y faltan vasitos souffle o tapas.",
  "The sneeze guard is clean, the bar is free of spills and fully stocked, the spoodles are clean, and souffle cups and lids are stocked and ready for guests.":
    "El protector contra estornudos está limpio, la barra está libre de derrames y totalmente abastecida, los spoodles están limpios, y los vasitos souffle y tapas están abastecidos y listos para los clientes.",
  "Beverage Bar": "Beverage Bar",
  "Utensils are almost out and storage crates are dirty and full of crumbs.":
    "Los utensilios están por agotarse y las cajas de almacenamiento están sucias y llenas de migas.",
  "Utensils stocked and storage crates are clean and labeled.":
    "Utensilios abastecidos y las cajas de almacenamiento están limpias y etiquetadas.",
  "The beverage bar is free of spills, the bubblers and teas are fully stocked, the Icee machine is stocked, all BIBs are working, the soda drain isn't overflowing with ice, the dispensers are wiped down, and all paper products (lids, straws, forks, knives, napkins, etc.) are stocked.":
    "El beverage bar está libre de derrames, los bubblers y tés están totalmente abastecidos, la máquina de Icee está abastecida, todos los BIB funcionan, el desagüe de soda no está desbordado de hielo, los dispensadores están limpios, y todos los productos de papel (tapas, popotes, tenedores, cuchillos, servilletas, etc.) están abastecidos.",
  "Trash Cans": "Botes de Basura",
  "The trash can is overflowing with trash spilling onto the counter, the top is dirty from spills, and the trays are stacked messily or overflowing off the top.":
    "El bote de basura está desbordado con basura cayendo sobre el mostrador, la parte de arriba está sucia por derrames, y las bandejas están apiladas de forma desordenada o desbordadas por arriba.",
  "The trash can is not overflowing, the top is wiped down from any spills, and the trays are stacked neatly without overflowing.":
    "El bote de basura no está desbordado, la parte de arriba está limpia de cualquier derrame, y las bandejas están apiladas ordenadamente sin desbordarse.",
  "Dining Room & Tables": "Comedor y Mesas",
  "Tables are left dirty with crumbs or spills, the floors haven't been swept, and chairs are pulled out with tables sitting crooked and unaligned.":
    "Las mesas quedan sucias con migas o derrames, los pisos no han sido barridos, y las sillas quedan afuera con las mesas torcidas y desalineadas.",
  "All tables are wiped down and clean, the floors are swept, and the chairs are pushed in with tables aligned neatly for a tidy dining room.":
    "Todas las mesas están limpias, los pisos están barridos, y las sillas están acomodadas con las mesas alineadas ordenadamente para un comedor pulcro.",
  "Restrooms": "Baños",
  "The restrooms are dirty and out of paper products like toilet paper, paper towels, or soap, the trash is overflowing, and a toilet is unflushed or not working properly.":
    "Los baños están sucios y sin productos de papel como papel higiénico, toallas de papel, o jabón, la basura está desbordada, y hay un inodoro sin descargar o que no funciona correctamente.",
  "The restrooms are clean and fully stocked with paper products (toilet paper, paper towels, and soap), the trash is not overflowing, and the toilets are flushed and in working order.":
    "Los baños están limpios y totalmente abastecidos con productos de papel (papel higiénico, toallas de papel, y jabón), la basura no está desbordada, y los inodoros están descargados y en buen funcionamiento.",
  "Patio": "Patio",
  "Patio tables are left dirty, the floor is littered with trash or debris, chairs are scattered with tables misaligned, and the umbrellas are left down.":
    "Las mesas del patio quedan sucias, el piso está lleno de basura o residuos, las sillas están desordenadas con las mesas desalineadas, y las sombrillas quedan cerradas.",
  "All patio tables are wiped down and clean, the floors are swept, chairs are pushed in with tables aligned neatly, and the umbrellas are up.":
    "Todas las mesas del patio están limpias, los pisos están barridos, las sillas están acomodadas con las mesas alineadas ordenadamente, y las sombrillas están abiertas.",

  // ── Resources page chrome ───────────────────────────────────────────────
  "This Month": "Este Mes",
  "Document Library": "Biblioteca de Documentos",
  "Operations": "Operaciones",
  "Onboarding & Termination": "Incorporación y Terminación",
  "Marketing": "Marketing",
  "Accidents & Injuries": "Accidentes y Lesiones",
  "Payroll": "Nómina",
  "Documents": "Documentos",
  "Click to open →": "Haz clic para abrir →",
  "Document needed": "Documento pendiente",
  "This document hasn't been added yet. Check back soon.": "Este documento aún no ha sido agregado. Vuelve a revisar pronto.",
  "sheets →": "hojas →",
  "Back to Portal": "Volver al Portal",
};
