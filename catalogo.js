/* Catálogo Apex Safety 2026 — dados transcritos do PDF.
   Cada item: [nome, CA, código, (categoria opcional)] */
window.CATEGORIAS = {
  pes: ["Pés", "fa-shoe-prints"],
  maos: ["Mãos", "fa-hand"],
  visual: ["Visual e facial", "fa-glasses"],
  auditiva: ["Auditiva", "fa-headphones"],
  respiratoria: ["Respiratória", "fa-head-side-mask"],
  cabeca: ["Cabeça", "fa-helmet-safety"],
  vestimentas: ["Vestimentas", "fa-vest"],
  altura: ["Altura e queda", "fa-person-falling"],
  pele: ["Pele", "fa-pump-soap"],
  sinalizacao: ["Sinalização", "fa-triangle-exclamation"],
  maisvendidos: ["Mais vendidos", "fa-fire"]
};

window.CATALOGO = [];
(function () {
  function B(marca, cat, itens) {
    itens.forEach(function (i) {
      window.CATALOGO.push({ marca: marca, cat: i[3] || cat, nome: i[0], ca: i[1], cod: i[2] });
    });
  }

  B("Bracol", "pes", [
    ["4098USES4600 Bota de Segurança Bracol Usafe Couro Relax Bico Pvc", "CA48413", "MLB1088407236"],
    ["2020BELS1600LL Bota de Segurança Bracol Couro Relax Bico Composite", "CA48418", "CPTBTBELS1600v"],
    ["4011BELF4600 Bota de Segurança Bracol Couro Relax Bico Pvc", "CA29492", "CPT4011BELF4600"],
    ["4098USES2400 Bota de Segurança Bracol Usafe Couro Relax Bico Aço", "CA28511", "MLB1116892126"],
    ["4031BSEM4600EL Sapato Bracol Microfibra Bico PVC", "CA38761", "CPT4012BSEMPTO"],
    ["4045BELS1602 Bota de Segurança Bracol Couro Relax PRP Bico Composite", "CA42330", "CPT4018BELS1602"],
    ["4045BELF1600 Bota de Segurança Bracol Microfibra Bico Composite", "CA38530", "CPTBTELM4018BELF"],
    ["4045BELS1600 Bota de Segurança Bracol Couro Relax Bico Composite", "CA42165", "CPT4018BELS"],
    ["4045BSES4600 Sapato de Segurança Bracol Couro Relax Bico PVC", "CA42239", "CPT4045BSES4600"],
    ["4011BSEM4600 Sapato de Segurança Bracol Microfibra Bico Pvc", "CA31242", "MLB1099576487"],
    ["Sapato Hospitalar Enfermagem Bracol Antiderrapante Impermeável Iate Moov", "CA38590", "MLB1130655655"],
    ["Sapato Hospitalar Enfermagem Bracol Antiderrapante Impermeável Flip", "CA38590", "MLB1130655655"],
    ["2020BSES1600 Sapato de Segurança Bracol Couro Relax Bico Composite", "CA48419", "CPTSPBSES1600"],
    ["4065HESM1600EL Bota de Segurança Fujiwara Microfibra Bico Composite", "CA43168", "CPTBMCFJB40"],
    ["4045BSEM1600 Sapato de Segurança Bracol Microfibra Bico Composite", "CA30112", "CPT4018BSEMPR"],
    ["4045BSAM1600 Sapato de Segurança Bracol Microfibra Bico Composite", "CA30529", "MLB1111689"],
    ["2020BSAS1600 Sapato de Segurança Bracol Couro Relax Bico Composite", "CA48408", "CPTSPBSAS1600"],
    ["4045BSAS4400 Sapato de Segurança Bracol Couro Relax Bico Pvc", "CA26719", "CPTSPTAMCR"],
    ["4031BAEN1600 Bota de Segurança Bracol Nobuck Bico Composite Eletricista", "CA50290", "CPTBNBC40"],
    ["4031BAEN4600 Bota de Segurança Bracol Nobuck Bico Pvc Marrom", "CA48383", "CPT4031BAEN4600EL"],
    ["4031BAEN4600 Bota de Segurança Bracol Nobuck Bico Pvc Preta", "CA48383", "CPT4031BAEN4600EL"],
    ["4031BAMS1662LL Bota de Segurança Manobreiro Couro Acolchoada Bico Composite PRP", "CA43938", "CPT4018BAMS166240"],
    ["4031BMMS1662LL Bota de Segurança Manobreiro Couro Metatarso Bico Composite PRP", "CA48582", "CPTBTACC40"],
    ["Bota de Pvc Bracol Cano Curto 82bpc600 C/ Forro", "CA37456", "MLB1227980608"],
    ["Bota de Pvc Bracol Cano Curto 82bpc600 C/ Forro (branca)", "CA37456", "MLB1079585413"],
    ["Bota de Pvc Bracol Cano Extra Curto 82bpe600 C/ Forro", "CA37456", "MLB1311378308"],
    ["Bota de Pvc Bracol Cano Longo 85bpl600 C/ Forro (branca)", "CA37455", "CPTBT85BPL600BR"],
    ["Bota de PVC Bracol Cano Longo 85bpl600 C/ Polaina", "CA37455", "CPT85BPL600"],
    ["Bota Pvc Bracol Cano Longo 85bpl600 C/ Forro", "CA37455", "CPT4010BPLFP"],
    ["Bota de Pvc Bracol Cano Curto 85bpc200 C/ Forro Bico Aço (branca)", "CA26586", "CPT85BPC200B"],
    ["Bota de Pvc Bracol Cano Curto 85bpc200 C/ Forro Bico Aço", "CA26586", "CPT85BPC200"],
    ["Bota de Pvc Bracol Cano 85bpc600 C/ Forro Térmico", "CA43017", "CPTBTCNCTCFBR"],
    ["4011BSEM1600 Sapato de Segurança Bracol Microfibra Bico Composite", "CA30112", "CPT4018BSEMBR"],
    ["4066BDGM1600LL Bota Frigorífica Branca Microfibra C/ Forro Bico Composite", "CA48124", "CPTBT4066BDGM1600"]
  ]);

  B("Kalipso", "maos", [
    ["Luva de Algodão Mesclada com Pigmento Antiderrapante Kalipso", "CA34474", "CPTLVMSILDKIT"],
    ["Luva de Algodão Mesclada com Pigmento Antiderrapante Kalipso Preta", "CA34491", "CPTLVTCKIT12"],
    ["Luva de Algodão Tricotada Mesclada Sem Pigmento Kalipso", "CA34473", "CPTLVTRSP"],
    ["Luva de PU Antiestática Multitato Kalipso", "CA15272", "CPTLPUKL"],
    ["Luva NBR Wave Kalipso de Poliéster Revestimento Nitrílico", "CA43773", "CPTLVNBRWAVE"],
    ["Luva de Algodão KA 20 Kalipso Revestimento Nitrílico", "CA35953", "CPTLVKA20"],
    ["Luva Nitrílica KA Premium Kalipso Cano Médio", "CA25254", "CPTLVNTKAPREM"],
    ["Luva de Algodão KA 35 Kalipso Revest. Nitrílico Resistência Química", "CA48701", "CPTLVNTK35"],
    ["Luva Térmica de Nylon Antártida Kalipso Revestimento PVC", "CA51094", "CPTLVTERMAT"],
    ["Luva Nitrílica KA 10 Kalipso Limpeza Geral Resistência Química", "CA11769", "CPTK10L"],
    ["Luva Nitrílica KA 15 Kalipso Cano Longo Proteção Química", "CA27598", "CPTLVNTK15"],
    ["Luva de Segurança Saara Anti Corte Kalipso Revestimento Poliuretano", "CA34712", "CPTLVSAARA"],
    ["Luva NBR Wave Pro Kalipso de Poliéster Revestimento Nitrílico", "CA50279", "CPTLVWAVEPRO"],
    ["Luva de Nylon NBR Pro Kalipso Revestimento Nitrilo", "CA50278", "LNBRPPK"],
    ["Luva de Poliéster Confortato Kalipso Revestimento Látex", "CA37091", "CPTLVCFT"],
    ["Luva Anticorte de Fibra Sintética Sonora Kalipso", "CA34456", "CPTLVATCT"],
    ["Luva de Algodão Eco Flex Kalipso Revestimento Látex", "CA38961", "CPTLVECO"],
    ["Luva de Látex Light Kalipso Limpeza Multiuso", "CA38090", "CPTLVLTLGAM"],
    ["Luva Blue Flex Kalipso de Fibra Sintética Revestimento Látex", "CA39668", "CPTLVBFL"],
    ["Luva Red Grip de Algodão Kalipso Revestimento Látex", "CA41415", "CPTLVREDGP"],
    ["Luva de Algodão KA 30 Kalipso Revestimento Nitrílico Resistência Química", "CA35954", "CPTLVNTK30"],
    ["Luva de Fibra Sintética Flex Foam Kalipso Revestimento Nitrílico", "CA43565", "CPTLFFK"],
    ["Luva de Látex Orange Kalipso Limpeza Geral Multiuso", "CA32499", "CPTLLOK"],
    ["Luva de Segurança Neoprex Kalipso Resistência Química", "CA15685", "CPTLNK"],
    ["Óculos de Proteção Leopardo Incolor Kalipso", "CA11268", "CPTOSL", "visual"],
    ["Óculos de Proteção Leopardo Fume Kalipso", "CA11268", "CPTOSLFM", "visual"],
    ["Óculos de Proteção Kalipso Panda Ampla Visão Sobrepor", "CA10344", "CPTOLPANDA", "visual"],
    ["Óculos de Proteção Kalipso Jaguar Modelo Rio de Janeiro Incolor", "CA10346", "CPTOCJAGUAR", "visual"],
    ["Óculos de Proteção Kalipso Jaguar Modelo Rio de Janeiro Fumê", "CA10346", "CPTOCJAGUARFM", "visual"],
    ["Óculos de Proteção Lince em Policarbonato Kalipso", "CA10345", "CPTOCLINCE", "visual"],
    ["Óculos Ampla Visão Rã Valvulado Kalipso", "CA11285", "CA11285", "visual"],
    ["Óculos de Proteção Koala Kalipso", "CA18422", "CPTOCKOALA", "visual"],
    ["Óculos de Proteção Aruba Kalipso Anti-Embaçante", "CA25716", "CPTOCARUBA", "visual"],
    ["Colete Refletivo Segurança Fluorescente 1 Bolso Kalipso", "", "CPTCLRFIB", "vestimentas"],
    ["Colete Refletivo de Segurança Fluorescente 4 Bolsos Kalipso", "", "CPTCLRF4B", "vestimentas"],
    ["Macacão Epi Proteção Contra Riscos Químicos Tipo 6 Kalipso", "CA48789", "CPTMPQTP6", "vestimentas"]
  ]);

  B("3M", "auditiva", [
    ["200un Protetor Auricular 3M 1100 sem Cordão 16dB", "CA5674", "CPTPROTAURKIT200"],
    ["100un Protetor Auricular 3M 1110 com Cordão 16dB", "CA5674", "CPTPROTAURCKIT100"],
    ["Protetor Auricular 3M Pomp Plus Com Cordão 19dB", "CA5745", "CPTPROTAURPPKIT100"],
    ["Abafador de Ruído Tipo Concha Pomp Muffler 3M 20Db", "CA14235", "CPTABRCP3M"],
    ["Abafador de Ruído 3M Muffler Acoplável ao Capacete", "CA33835", "CPTABFMUFACOPL"],
    ["Capacete de Segurança 3M H-700 Ventilado com Suspensão Catraca - Várias Cores", "CA29637", "CPTCAPSAZ3MBR", "cabeca"],
    ["Máscara Respirador para Partículas 3M 8822 Concha Branco", "CA5657", "CPTRESPDESCBRC", "respiratoria"],
    ["Máscara Respirador para Partículas 3M 8822 Concha Verde", "CA5657", "CPTRESPDESCVC", "respiratoria"],
    ["Respirador Reutilizável Semifacial 3M 6200", "CA4115", "CPTRESPSFMD", "respiratoria"],
    ["Filtro para Particulados 3M 5N11 - C/ 02UN", "", "CPTFILPART", "respiratoria"],
    ["Cartucho Químico 3M 6003 - Amarelo - PCT 2un", "", "CPTCARTQUIMA", "respiratoria"],
    ["Cartucho Químico 3M 6001 - Preto/Letras brancas - PCT 02un", "", "CPTCARTQUIMA", "respiratoria"],
    ["Retentor para Filtro 5N11 3M 0501", "", "CPTFILPART", "respiratoria"]
  ]);

  B("Nutriex", "pele", [
    ["Creme de Proteção Luva Química Grupo 3 Plus 200G Nutriex", "CA43802", "CPTCPPLQ200"],
    ["Creme de Proteção Luva Química Grupo 3 Plus 4 Litros Nutriex", "CA43802", "CPTCRMPTLVGR3"],
    ["Dispenser para Galão Luva Química G3 Profissional 4 Litros Nutriex", "", "CPTDSPLVCMG3"],
    ["Protetor Solar FPS 30 1/3 UVA 120ML Nutriex", "", "CPTPFPS30120ML"],
    ["Protetor Solar FPS 30 1/3 UVA 1L Nutriex", "", "CPTPSFPS301L"],
    ["Protetor Solar FPS 30 1/3 UVA 4L Nutriex", "", "CPTPSFPS304L"],
    ["Protetor Solar FPS 60 1/3 UVA 120ML Nutriex", "", "CPTPFPS60120ML"],
    ["Protetor Solar FPS 60 1/3 UVA 1L Nutriex", "", "CPTPSFPS601L"],
    ["Repelente e Protetor Solar FPS 30 1/3 UVA 120ML Nutriex", "", "CPTRFPS30120ML"],
    ["Repelente Insetos Spray 100ML duração 4h Nutriex", "", "CPTRI100ML"],
    ["Sabonete Líquido Desengraxante Citric Power Eco Esfoliante 200ml Nutriex", "", "CPTSBLQDCPEES200"],
    ["Sabonete Líquido Desengordurante Citric Power Eco Esfoliante 2L Nutriex", "", "CPTSLIQDCP2L"]
  ]);

  B("Facintos", "altura", [
    ["Cinturão Paraquedista 1 ponto PQ310 Facintos", "CA15728", "CPTC1APQ"],
    ["Cinturão Paraquedista 3 pontos PQ PF/RS Regulagem e Ponto Frontal Facintos", "CA39205", "CPTC3AFRTM"],
    ["Cinturão Paraquedista 7 Pontos Fita TOR Espaço Confinado e Suporte Lombar", "CA39135", "CPTC7AECTOR"],
    ["Cinto Tipo Paraquedista 5 Argolas P. Frontal PQ3 Facintos", "CA37126", "CPTC5ARGF"],
    ["Talabarte de Posicionamento Fita Regulável e Revestido", "", "CPTTPFC"],
    ["Talabarte Y em Fita Tubular Absorvedor e Ganchos de 55 e 17mm", "", "CPTTYEABS"],
    ["Trava Queda NAC P/ Corda 12mm Facintos", "", "CPTTQNAC12MM"]
  ]);

  B("Athenas", "altura", [
    ["AT 7015 ATHOS III Athenas", "CA37975", "CPTCPQAT"],
    ["AT 7070 C Trava Quedas Corda 12MM Com Extensor e Dupla Trava Athenas", "", "CPTTQCCEDT"],
    ["AT 7015 A3A I Cinto Paraquedista Athenas", "CA40800", "CPTCSTPMH"],
    ["AT 7015 ATHOS Confort II Cinto Paraquedista Athenas", "CA37977", "CPTAT7015"],
    ["AT 5033 Roldana de Aço Inox Athenas", "", "CPTRDAÇO"],
    ["ATYFE ABS707 Talabarte Y C/ Elástico NBR 15834 Athenas", "", "CPTATY707"],
    ["AT7033 Cinturão de Segurança Tipo Paraquedista 4 Pontos Athenas", "CA39538", "CPTCPQ4P"],
    ["ATYFT ABS707 Talabarte Y C/ Fita NBR 15834 Athenas", "", "CPTATYFT"],
    ["AT 700 AJ MN TA Talabarte de Posicionamento Athenas", "", "CPTTPAT700"]
  ]);

  B("Steelflex", "altura", [
    ["Trava Quedas Retrátil Aço de 4,8mm de 6M Steelflex", "", "CPTTQRF48MM6M"],
    ["Trava Quedas Retrátil Com Fita de 25mm 6M ABNT NBR 14628/2010 Steelflex", "", "CPTTQRF25MM6M"],
    ["Trava-queda Retrátil 2,5 M Em Fita Com Absorvedor Steelflex Preto/Vermelho", "", "75490748082"],
    ["Trava Quedas Retrátil Cabo de Aço 30 Metros Steelflex", "", "CPTTVQDCBAÇO30M"],
    ["Trava Quedas Retrátil Com Cabo de Aço de 10 Metros NBR 14628/2010 Steelflex", "", "MLB1788197162"],
    ["Trava Quedas Retrátil Cabo de Aço 20 Metros Steelflex", "", "CPTTVQDDL1886A"],
    ["Tripé Steelflex Alumínio Espaço Confinado Polia, Bolsa e Mosquetão EN 795:2012", "", "CPTTRBCRG"],
    ["Trava Quedas Para Corda de 12mm de Espessura ABNT NBR 14627/2010 Steelflex", "", "CPTTQPC12MM"],
    ["Mosquetão de Aço Forjado Trava Dupla com Rosca Steelflex", "", "CPTMQCAÇO"]
  ]);

  B("Estival", "pes", [
    ["Bota de Segurança Eletricista Estival Microfibra Bico Composite Bidensidade", "CA45932", "CPTEN10143S2"],
    ["Sapato de Segurança Estival Energy Microfibra Bico PVC Bidensidade", "CA50880", "CPTSSMICRESTPTOEVER"],
    ["Sapato de Segurança Estival Energy Microfibra Bico Composite Bidensidade", "CA50124", "CPTSSMICRESTPTOECIN"],
    ["Bota de Segurança Estival Hybrid Microfibra Bico Composite Bidensidade", "CA47901", "CPTBTHBCP"],
    ["Bota de Segurança Estival Hybrid Microfibra Bico Pvc Bidensidade", "CA47843", "CPTBTHBPVC"],
    ["Sapato de Segurança Estival Hybrid Microfibra Bico Composite Bidensidade", "CA47750", "CPTSPHBCP"],
    ["Sapato de Segurança Estival Hybrid Microfibra Bico PVC Bidensidade", "CA47823", "CPTSPHBPVC"]
  ]);

  B("Gogowear", "pes", [
    ["Botina de Segurança Gogowear Picker Couro Bico PVC Sola Borracha", "CA43770", "CPTPICKERRS"],
    ["Sapato de Segurança Antitorção Gogowear Hard Nobuck Borracha", "CA43770", "CPTEDHCNBC"],
    ["Botina de Segurança Nobuck Gogowear Coyote Sola Borracha", "CA43770", "CPTEDCCL"],
    ["Botina de Segurança Nobuck Gogowear Duster Bico PVC Sola Borracha", "CA43770", "CPTBCSD"]
  ]);

  B("Safetline", "pes", [
    ["4865AC/EL Botina Elástico Eletricista Bico PVC Couro Vaqueta", "CA13175", "CPTBEEBPVC"],
    ["4867GI/EL Botina Elástico Eletricista Bico Composite Couro Vaqueta", "CA31443", "CPTBEEBC"],
    ["4857GL/CF/EL/IP/NB Botina de Amarrar Gran Luxo Nobuck Miura Eletricista Bico Composite", "CA38791", "CPTBDAGRLX"],
    ["4867AC/EL/HT Botina de Elástico Bico Composite Palmilha AntiPerfuro", "CA34626", "CPTBEBCPL"],
    ["4855AC Botina de Amarrar Acolchoada em Nobuck com Bico PVC", "CA13177", "CPTBAANKPVC"],
    ["Botina de Elástico Acolchoada com Bico PVC", "CA13174", "CPTBEAPVC"]
  ]);

  B("Kadesh", "pes", [
    ["Bota de Segurança Kadesh Combat Couro Bico Aço Poliuretano", "CA43069", "CPTBTECA"],
    ["Bota de Segurança Kadesh Combat Couro Bico PVC Poliuretano", "CA43108", "CPTBTEC"],
    ["Bota Térmica Kadesh Microfibra Bico PVC Bidensidade", "CA43975", "CPTBTMCRPVCBR"],
    ["Bota de Segurança Kadesh Flex Nobuck Bico Pvc Bidensidade", "CA16252", "CPTFLEXK"]
  ]);

  B("Camper", "auditiva", [
    ["Abafador Concha Camper Confort Plus 26dB Protetor Auditivo", "CA48054", "CPTABFCONFOPLUS"],
    ["Protetor Abafador C-200 18dB Soft Slim Camper", "CA33135", "CPTABFSOFT18DB"],
    ["Protetor Auditivo Acoplat ECO 12db Camper", "CA43430", "CPTPROTAUCAP"],
    ["Máscara Respirador sem Válvula PFF2 Camper", "CA38942", "CPTPFF2SVC", "respiratoria"],
    ["Máscara Respirador com Válvula PFF2 Camper", "CA38944", "CPTPFF2CVC", "respiratoria"],
    ["Máscara Respirador com Válvula PFF2 CO Camper", "CA38943", "CPTRPFF2CO", "respiratoria"],
    ["Suporte Facial com Catraca Camper", "CA33262", "CPTSPFC800304", "visual"],
    ["Lente Tipo Bolha Incolor Camper", "CA36318", "CPTLTBC", "visual"],
    ["Malha de Aço Protetor Facial Camper", "", "CPTMDAÇO8X12", "visual"],
    ["Capacete de Segurança Avant com Suspensão Plástica Camper", "CA34414", "CPTCPAVANT", "cabeca"],
    ["Kit Capacete Conjugado Azul Camper", "", "CPTCAPCONJKIT", "cabeca"],
    ["Suporte Protetor Facial Universal Camper", "CA36318", "CPTSUPUNM", "visual"]
  ]);

  B("Medix", "maos", [
    ["Luva NFlex Latex Neoprene Flocada MBX", "CA49127", "CPTLNFLNF"],
    ["Luva Multiuso Latex Amarela MBX", "CA44541/46977", "CPTLML"],
    ["Luva Vulcanix Com Palma de Borracha Natural Vulcanizada MBX", "CA48722", "CPTLVPBNV"],
    ["Luva Rubbergrip Com Banho em Borracha Natural Corrugada MBX", "CA48737", "CPTLRCBBNC"],
    ["Luva Tricotada Cottonix C/ Pigmentos na Palma MBX", "CA48900", "CPTLTCXCP"],
    ["Luva PU3 Resistente a Corte MBX Nível D5", "CA48856", "CPTPU3RC"],
    ["Luva de Vaqueta Couro Tex MBXPRO c/ Dorso Ventilado e Punho Fechamento em Velcro", "CA48924", "CPTLVMBXPRO"],
    ["Luva em Malha de Aço Ringcut Ambidestra", "CA49302", "CPTLMAÇRM"],
    ["Luva PU Preta MBX PRO", "CA48758", "CPTLPUPMXB"],
    ["Luva Multiuso Latex MBLife", "CA44541", "CPTLVLPMBF"],
    ["Luva em Látex de Procedimento Descartável Com Pó Cx 100 Unid MBlife", "CA41486", "MLB1854744423"],
    ["Luva Nitrílica S/Pó Black Anvisa Medix", "CA38644", "CPTLVNTPT"],
    ["Luva Nitrílica S/Pó Azul Anvisa Medix", "CA48246", "CPTLVNTAZ"],
    ["Luva Látex Sem Pó Para Procedimento Não Cirúrgico Medix", "CA38930", "CPTLVLTSP"],
    ["Máscara Tripla Descartável C/ Elástico Branca Caixa 50uni Medix", "", "MLB1807282282", "respiratoria"],
    ["Máscara Tripla Descartável C/ Elástico Preta Caixa 50uni Medix", "", "CPTMTDCXP", "respiratoria"],
    ["Touca Descartável Tnt Branca Odonto Estética Anvisa 100 Uni Medix", "", "CPT6080TSEDCB", "vestimentas"],
    ["Avental Descartável Tnt Manga Longa 16 G - Pacote C/ 10 Unid Medix", "", "CPTADTNTML16", "vestimentas"],
    ["Avental Descartável Tnt Manga Longa 40 G - Pacote C/ 10 Unid Medix", "", "MLB1827576523", "vestimentas"]
  ]);

  B("Valcan", "maos", [
    ["Luva de Raspa Reforçada Clut Punho 07 Valcan", "CA39782", "CPTLVRSP7CM"],
    ["Luva de Raspa Reforçada Clut Punho 20 Valcan", "CA39782", "CPTLVCUTPH20"],
    ["Luva de Raspa com Forro Térmico Punho 20cm Valcan", "CA32586", "CPTLVRPFTP20"],
    ["Luva de Vaqueta Total Punho em Raspa 20cm Valcan", "CA25387", "CPTLDVT20VC"],
    ["Luva de Vaqueta Mista Punho em Raspa 15 cm Valcan", "CA25387", "CPTLVMTP15"],
    ["Luva de Vaqueta Mista Punho em Raspa 20 cm Valcan", "CA25387", "CPTLVMRPH20G"],
    ["Luva de Vaqueta Total Petroleira Flex Valcan", "CA41810", "CPTLVVQTL"],
    ["Luva de Vaqueta Mista Petroleira Valcan", "CA42219", "CPTLVPMVC"],
    ["Avental de Raspa Barbeiro sem Emenda Soldador 1,20x60cm Valcan", "CA47851", "CPTABR120V", "vestimentas"],
    ["Avental de Raspa Sem Emenda Soldador 1,00x0,60cm Valcan", "CA19224", "CPTAVRSP100X60", "vestimentas"],
    ["Perneira de Raspa Soldador 43cm Fechamento em Velcro Valcan", "CA25388", "CPTPNRSP43CM", "vestimentas"],
    ["Mangote em Raspa com Fivela Soldador 60cm Valcan", "CA27113", "CPTMGRSPF60CM", "vestimentas"]
  ]);

  B("Mondial e Comprot", "cabeca", [
    ["Boné de Segurança Casquete Azul Comprot", "CA43553", "CPTBNSCTAZ"],
    ["Boné de Segurança Casquete Preto Comprot", "CA43553", "CPTBNSCT"],
    ["Perneira de Segurança em Bidim 03 Talas de Soldada Mondial", "CA44964", "CPTPSB3TS", "vestimentas"],
    ["Perneira 03 Talas Com Fechamento em Velcro Mondial", "CA44964", "CPTP3TFV", "vestimentas"],
    ["Touca Tipo Árabe em Helanca Fechamento em Velcro Azul Mondial", "CA44963", "CPTTTAHLAZ"],
    ["Boné Tipo Árabe em Helanca Fechamento em Velcro Azul Mondial", "CA44963", "CPTBTAHLAZ"],
    ["Touca Tipo Árabe em Brim Fechamento em Velcro Azul Mondial", "CA50464", "CPTTTABRAZ"],
    ["Boné Tipo Árabe em Brim Fechamento em Velcro Azul Mondial", "CA44963", "CPTTTAHLAZ"],
    ["Boné Tipo Árabe em Helanca Fechamento em Velcro Caqui Mondial", "CA44963", "CPTBTAHLAZ"],
    ["Boné Tipo Árabe em Brim Fechamento em Velcro Caqui Mondial", "CA50464", "CPTTTABRAZ"]
  ]);

  B("Tegape", "sinalizacao", [
    ["Tela Sinaleiro Cerquite Azul e Branco 1,20X50M Tegape", "", "CPTTLSNCQA"],
    ["Tela Tapume de Segurança 120cmx50m Tegape", "", "CPTTT120X50"],
    ["Tela Sinaleiro Cerquite Laranja e Branco 1,20X50M Tegape", "", "CPTTLSNCQ"]
  ]);

  B("Vinilseg", "vestimentas", [
    ["Capa de Chuva Forrada PVC Soft Vinilseg", "CA33304", "CPTCPCVSOFT"],
    ["Capa de Chuva Jaqueta PVC Forrado Soft com Touca Vinilseg", "CA33303", "CPTBPVCFSV"],
    ["Capa de Chuva Descartável com Touca Vinilseg", "", "CPTCPDESC"],
    ["Capa de Chuva PVC Emborrachada Resistência Química Vinilseg", "CA48177", "CPTCPEMBDP"],
    ["Avental PVC Laminado Soft com Ilhós 1,20x0,70 Vinilseg", "CA33301", "CPTAPVCIV"],
    ["Avental de Vinil Impermeável para Cozinha Açougue 1,20x070 Vinilseg", "CA33301", "CPTAVTDVN"],
    ["Calça de Chuva PVC Forrada Soft Vinilseg", "CA34472", "CPTCPVCSOFT"],
    ["Calça Térmica Câmara Fria Nylon Impermeável Vinilseg", "CA45049", "CPTCLNFGR"],
    ["Japona Jaqueta Térmica Câmara Fria Nylon Vinilseg", "CA45058", "CPTJPTRMFGR"],
    ["Capa de PVC Forrada Morcego Soft Vinilseg", "CA33304", "CPTCPVCMC"],
    ["Capa de Chuva PVC Laminada Soft Incolor Vinilseg", "CA35560", "CPTCPVCSI"],
    ["Conjunto PVC Motoqueiro Napa Preto Vinilseg", "CA33297-33298", "CPTCPVCMNP"],
    ["Mangote PVC Forrado AM Top Vinilseg", "CA33303", "CPTPVCFAM"],
    ["Calça FR Cedrotech C/ Ref AM Fluorescente Vinilseg", "CA50305", "CPTCLFR"],
    ["Camisa FR Cedrotech C/ Ref AM Fluorescente Vinilseg", "CA50298", "CPTCFRAM"],
    ["Mangote PVC Laminado Soft Transparente Vinilseg", "CA33303", "CPTMPVCLST"],
    ["Jaqueta PVC Soft Forrado Vinilseg", "CA33303", "CPTBPVCFSV"],
    ["Avental KP1000 Trevira Dupla Face com Ilhós Preto/Laranja Vinilseg", "CA33301", "CPTAKP1000"],
    ["Avental PVC Forrado Barbeiro C/ Tiras Vinilseg", "CA33301", "CPTAVBRBVN"],
    ["Avental KP400 C/ Tiras e Engate Branco Vinilseg", "CA33301", "CPTAVKP400VNS"]
  ]);

  B("Super Safety", "maos", [
    ["Luva de Látex Natural Corrugado SS 1009 Super Safety", "CA31895", "CPTLLNC"],
    ["Luva Cut Oil 1014 Super Safety", "CA38646", "CPTLVCUTOSPST"],
    ["Luva Nitro Black Foam Super Safety", "CA49437", "CPTNBF"],
    ["Luva SS1001 Super Safety", "CA32031", "CPTLNPL"],
    ["Luva SS1002L Super Safety", "CA49434", "CPTNPNI"],
    ["Luva SS1007N-R Super Safety", "CA32039", "CPTLCRC"],
    ["Luva Nitro Max 15cm Super Safety", "CA42285", "CPTLNM"],
    ["Luva SS1005 Látex Corrugado Super Safety", "CA32035", "CPTLNLC"],
    ["Luva SS1002 Super Safety", "CA32033", "CPTNPN"],
    ["Luva SS1006N Punho Anatômico Super Safety", "CA41076", "CPTNYNSF"],
    ["Luva PU SS1003 Super Safety", "CA32034", "CPTLPSF"],
    ["Luva Anticorte 1008 Super Safety", "CA32036", "CPTLATSS1008"],
    ["Luva Nitrílica Verde com Forro Nitrogreen CA 33334 Super Safety", "CA33334", "CPTLVNG"],
    ["Luva Nitrile Long Super Safety", "CA40506", "CPTLNLSF"],
    ["Luva Nitrílica Preta Super Glove Automotivo e Indústria C/100uni Super Safety", "CA38645", "CPTLNPSGL"],
    ["Colete Refletivo Fluorescente 1 Bolso Amarelo Super Safety", "", "CPTCRFB", "vestimentas"],
    ["Colete Refletivo Fluorescente 1 Bolso Laranja Super Safety", "", "CPTCRF", "vestimentas"]
  ]);

  B("Volk", "maos", [
    ["Luva Tricotada C/ Pigmento na Palma Tam Único CottonVolk", "CA30521", "CPTLCOTONTPU"],
    ["Luva Fibra Sintética C3 SmartVolk", "CA48483", "CPTLFSC3S"],
    ["Luva Poliéster Fit Volk", "CA27946", "CPTLPFITBG"],
    ["Luva de Segurança Resistente ao Corte Nível 5 Cut SmartVolk", "CA39416", "CPTLSRCN5"],
    ["Luva de Segurança Nitril Wave Smart Com Banho Nitrílico Volk", "CA46803", "CPTLSNWVK"],
    ["Luva Therma Grip Full Volk", "CA41784", "CPTLVTMGPFULL"],
    ["Luva Raspa Weld Premium Azul com Laranja XG Volk", "CA17158", "CPTLVRPWDPXG"],
    ["Luva de Raspa Weld Master Azul Volk", "CA19894", "CPTLVRPWDM"],
    ["Luva Cut Oil Volk", "CA36606", "CPTLCUTO"],
    ["Luva Black Tractor Volk", "CA37981", "CPT8803LBT"],
    ["Luva Antivibração Gorila Volk", "CA38257", "CPTLVGR"],
    ["Luva Cut PU fibra sintética Volk", "CA37266", "CPT8806LCC"],
    ["Luva Cut Soft Volk", "CA46288", "CPTLVCUTST"],
    ["Luva VDBNIT Malha Volk", "CA25084", "CPTVDBNIT"],
    ["Luva VDBNIT Lona Volk", "CA25116", "CPTVDBNITLN"],
    ["Luva Tricotada Algodão 4 fios S/Pigmento Branca Tam Único Cotton Volk", "CA30520", "CPTLCOTONVU"],
    ["Luva Tricotada Algodão 4 fios S/Pigmento Black Tam Único Cotton Volk", "CA36348", "CPTLCOTONVUPTA"],
    ["Luva Therma Grip Volk", "CA18663", "CPT8802LTG"],
    ["Luva Pu Tátil Black Volk", "CA30916", "CPT8809LTVPTA"],
    ["Luva Orange Volk", "CA21367", "CPT8808LO"],
    ["Luva Nylon Fibra Sintética Microfoam Volk", "CA41812", "CPTLLCS"],
    ["Luva Nitril Full Volk", "CA25280", "CPTLNFULL"],
    ["Luva Impacto Cut R2 Volk", "CA42941", "CPTLVIMPCTR2"],
    ["Luva Grip Volk", "CA18007", "CPT8807LG"],
    ["Luva Nitrílica Sensi Soft sem Pó Caixa c/ 100un Volk", "CA46249", "CPTLVNSSPVK"],
    ["Luva Descartável de Procedimento Nitrílica Preta Sensi Slim Volk", "CA43174", "CPTLVNTSLPT"],
    ["Luva de Vinil Medical Saúde Volk", "CA21088/40254", "CPTLVVNMD"],
    ["Luva Vinil Sem Amido Volk", "CA20722", "CPTLVSAMV"],
    ["Luva Vinil com Amido Volk", "CA20723", "CPTLVVNCAM"],
    ["Luva TPE Flex Transparente Volk", "", "CPT8810TPETRANS"],
    ["Luva TPE Flex Preta Volk", "", "CPT8811TPEPTA"],
    ["Luva Latex Corrugada Fibra Natural - Adere Volk", "CA40174", "CPTLLCFNAD"],
    ["Luva Multiuso Amarela Volk", "CA10695", "CPTLV105IMUAMC"],
    ["Luva Reforçada Laranja Volk", "CA37815", "CPTLVRFLR"],
    ["Luva Ranhurada Volk", "CA15100", "CPT8812LRV"],
    ["Luva Multiuso Slim Volk", "CA38310", "CPT8814LMSAM"],
    ["Luva Verniz Silver Amarela Volk", "CA16312", "CPT8801LVSAM"],
    ["Luva Verniz Silver Azul Volk", "CA16312", "CPT8801LVSAM"],
    ["Luva Nitrílica sem Forro Volk", "CA16314", "CPT8813LNSFV"],
    ["Luva Grip Comfort CA 38293 Volk (verde)", "CA16313", "CPT8804LNFTV"],
    ["Luva Grip Comfort CA 38293 Volk", "CA38293", "CPT8805LGCT7P"],
    ["Macacão de Segurança Covertech 100 Volk", "CA39183", "CPTMSCTH100", "vestimentas"],
    ["Macacão de Segurança Covertech 200 Volk", "CA39299", "CPTMSCT200", "vestimentas"],
    ["Óculos Vision 300 Transparente Antirrisco Volk", "", "CPTOC300TR", "visual"],
    ["Óculos Vision 200 Transparente Antirrisco Volk", "", "CPTLVSAMV", "visual"],
    ["Óculos Vision 200 Cinza Antirrisco Volk", "", "CPTOC200CAR", "visual"],
    ["Óculos Vision 100 Transparente Antirrisco Volk", "", "CPTOC100TR", "visual"],
    ["Óculos Vision 100 Cinza Antirrisco Volk", "", "CPTOV100LCZ", "visual"]
  ]);

  /* Mais vendidos de 2026 (XMLs de venda, por faturamento): código do item → posição no ranking */
  var MAIS_VENDIDOS = {
    "CPTBTELM4018BELF": 1,   /* Botina Bracol Elástico Microfibra Composite (4045BELF) */
    "CPTBT4066BDGM1600": 2,  /* Bota Frigorífica Branca Bracol c/ forro (4066BDGM) */
    "CPTLATSS1008": 3,       /* Luva Anticorte 1008 Super Safety */
    "MLB1079585413": 4,      /* Bota PVC Branca Cano Curto Bracol (82BPC600) */
    "CPTBMCFJB40": 5,        /* Botina Fujiwara Microfibra Composite (4065HESM) */
    "CPTBTBELS1600v": 6,     /* Botina Bracol Bico Composite (2020BELS) */
    "CPTABRCP3M": 7,         /* Abafador Pomp Muffler 3M */
    "CPTLVNSSPVK": 8,        /* Luva Nitrílica Sensi Soft Volk (cx 100) */
    "MLB1088407236": 9,      /* Botina Bracol Usafe Bico PVC (4098USES) */
    "CPT4018BELS": 10        /* Botina Bracol Elástico Composite (4045BELS) */
  };
  window.CATALOGO.forEach(function (p) { if (MAIS_VENDIDOS[p.cod]) p.rank = MAIS_VENDIDOS[p.cod]; });
})();
