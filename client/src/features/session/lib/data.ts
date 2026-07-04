import { PCProject } from "./modal"

const projectsData: PCProject[] = [
    {
        id: '1',
        name: 'Ultra Gaming Build',
        cpu: 'Intel Core i9-14900K',
        gpu: 'RTX 4090 24GB',
        priceUZS: 42500000,
        status: 'Completed',
        updatedAt: 'Bugun, 09:15',
    },
    {
        id: '2',
        name: 'Budget Workstation',
        cpu: 'AMD Ryzen 5 7600X',
        gpu: 'RTX 4060 Ti 8GB',
        priceUZS: 14200000,
        status: 'Completed',
        updatedAt: 'Kecha, 18:40',
    },
    {
        id: '3',
        name: 'Custom Loop Rig',
        cpu: 'AMD Ryzen 9 7950X3D',
        gpu: 'RTX 4080 Super',
        priceUZS: 31800000,
        status: 'In Progress',
        updatedAt: '03.06.2026',
    },
]

export { projectsData }