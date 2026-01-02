import prisma from "../core/databaseClient/prismaClient/prismaClient.js"

async function main() {

	// 1- Creating university
	const university = await prisma.university.create(
		{
			data: {
				name: "Université des Sciences et de la Technologie Houari Boumediene",
				shortName: "USTHB",
				description: "Founded in 1974 and designed by Oscar Niemeyer, USTHB is Algeria's premier public university for science and technology. It hosts nine faculties across a 105-hectare campus in Bab Ezzouar, specializing in engineering, computing, and natural sciences.",
				location: "BP 32, El Alia, Bab Ezzouar, 16111, Algiers, Algeria",
				website: "https://www.usthb.dz",
			},
		});

	// 2 & 3- Creating faculties and their specialties for USTHB
	const facultiesData = [
		{
			name: "Faculté d'Informatique",
			shortName: "FI",
			description: "The main hub for Computer Science studies at USTHB, covering Software Engineering, Artificial Intelligence, Data Science, and Theoretical Computer Science.",
			website: "https://fi.usthb.dz",
			specialties: [
				{ name: "Informatique Académique (ACAD)", shortName: "ACAD", description: "Theoretical Computer Science focusing on algorithms, logic, and complexity." },
				{ name: "Ingénierie des Systèmes d'Information et Logiciels (ISIL)", shortName: "ISIL", description: "Software engineering, web development, and enterprise information systems." },
				{ name: "Systèmes Informatiques et Réseaux (GTR)", shortName: "GTR", description: "Network architecture, distributed systems, and cybersecurity." },
				{ name: "Intelligence Artificielle (IA)", shortName: "IA", description: "Machine learning, data science, and neural networks." },
			]
		},
		{
			name: "Faculté d'Électronique et d'Informatique",
			shortName: "FEI",
			description: "Focuses on Electronics, Telecommunications, Automatics, and Systems Engineering. It is one of the largest and most historically significant faculties at the university.",
			website: "https://fei.usthb.dz",
			specialties: [
				{ name: "Télécommunications", shortName: "TELECOM", description: "Signal processing, wireless networks, and communication protocols." },
				{ name: "Automatique", shortName: "AUTO", description: "Control systems, robotics, and industrial automation." },
				{ name: "Électronique", shortName: "ELEC", description: "Circuit design, embedded systems, and microelectronics." },
				{ name: "Électrotechnique", shortName: "ELECTRO", description: "Power systems, electrical machines, and energy distribution." },
			]
		},
		{
			name: "Faculté de Mathématiques",
			shortName: "FM",
			description: "Home to pure and applied mathematics, operations research, and statistical analysis. This faculty provides the mathematical foundation for all engineering disciplines.",
			website: "https://math.usthb.dz",
			specialties: [
				{ name: "Mathématiques Fondamentales", shortName: "MATH-FOND", description: "Pure mathematics, analysis, and algebra." },
				{ name: "Recherche Opérationnelle (RO)", shortName: "RO", description: "Optimization, decision-making models, and graph theory." },
				{ name: "Probabilités et Statistique", shortName: "STAT", description: "Data analysis, stochastic processes, and statistical modeling." },
			]
		},
		{
			name: "Faculté des Sciences Biologiques",
			shortName: "FSB",
			description: "Dedicated to the study of life sciences, including molecular biology, genetics, ecology, and biotechnology. It manages numerous high-tech research labs.",
			website: "https://fsb.usthb.dz",
			specialties: [
				{ name: "Biologie Cellulaire et Moléculaire", shortName: "BCM", description: "Genetics, molecular mechanisms, and cell biology." },
				{ name: "Biologie et Physiologie des Organismes", shortName: "BPO", description: "Physiology of plants and animals." },
				{ name: "Écologie et Environnement", shortName: "ECO", description: "Environmental protection and biodiversity." },
			]
		},
		{
			name: "Faculté de Chimie",
			shortName: "FC",
			description: "Covers organic, inorganic, and physical chemistry, as well as environmental sciences and chemical engineering principles.",
			website: "https://chimie.usthb.dz",
			specialties: [
				{ name: "Chimie Fondamentale", shortName: "CHIM-FOND", description: "Core concepts of organic and inorganic chemistry." },
				{ name: "Chimie de l'Environnement", shortName: "CHIM-ENV", description: "Chemical analysis applied to environmental issues." },
			]
		},
		{
			name: "Faculté de Physique",
			shortName: "FP",
			description: "Explores material science, theoretical physics, renewable energy, and nuclear physics. A core institution for scientific research in Algeria.",
			website: "https://physique.usthb.dz",
			specialties: [
				{ name: "Physique Théorique", shortName: "PHYS-THEO", description: "Quantum mechanics and relativity." },
				{ name: "Physique des Matériaux", shortName: "PHYS-MAT", description: "Condensed matter physics and nanotechnology." },
				{ name: "Physique Énergétique", shortName: "PHYS-EN", description: "Renewable energy and thermodynamics." },
			]
		},
		{
			name: "Faculté de Génie Civil",
			shortName: "FGC",
			description: "Responsible for training in construction, structural engineering, architecture, and hydraulics, essential for the infrastructure development of Algeria.",
			website: "https://fgc.usthb.dz",
			specialties: [
				{ name: "Génie Civil", shortName: "GC", description: "Structural engineering and construction management." },
				{ name: "Hydraulique", shortName: "HYDRO", description: "Water resources, dams, and fluid mechanics." },
			]
		},
		{
			name: "Faculté de Génie Mécanique et Génie des Procédés",
			shortName: "FGMGP",
			description: "Focuses on mechanical design, thermodynamics, and industrial process engineering, bridging the gap between theory and industrial application.",
			website: "https://fgmgp.usthb.dz",
			specialties: [
				{ name: "Génie Mécanique", shortName: "GM", description: "Mechanical design, manufacturing, and thermodynamics." },
				{ name: "Génie des Procédés", shortName: "GP", description: "Chemical engineering and industrial process design." },
				{ name: "Science des Matériaux", shortName: "SM", description: "Study of material properties and applications in industry." },
			]
		},
		{
			name: "Faculté des Sciences de la Terre, de la Géographie et de l'Aménagement du Territoire",
			shortName: "FSTGAT",
			description: "The FSTGAT focuses on the study of the Earth's soil and subsoil. It comprises three departments: Geology, Geophysics, and Geography & Territorial Planning.",
			website: "https://fst.usthb.dz",
			specialties: [
				{ name: "Géographie et Aménagement du Territoire", shortName: "GAT", description: "Urban planning and territorial management." },
				{ name: "Géologie", shortName: "GEOL", description: "Study of earth materials and structures." },
				{ name: "Géophysique", shortName: "GEOPH", description: "Physics of the earth, seismology, and exploration." },
			]
		}
	];

	for (const faculty of facultiesData) {
		await prisma.faculty.create({
			data: {
				name: faculty.name,
				shortName: faculty.shortName,
				description: faculty.description,
				website: faculty.website,
				universityId: university.id,
				specialties: {
					create: faculty.specialties
				}
			}
		});
		console.log(`Created Faculty ${faculty.shortName} with ${faculty.specialties.length} specialities`);
	}

	console.log("Seeding completed.");

}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})