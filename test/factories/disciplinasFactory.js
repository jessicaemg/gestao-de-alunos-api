import { faker } from "@faker-js/faker";

export function novaDisciplinas() {

    const timestamp = Date.now();

    return {

        nome: faker.person.jobTitle(),
        codigo: `${timestamp}`,
        cargaHoraria: 80

    }
}