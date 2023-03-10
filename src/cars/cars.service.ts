import { Injectable } from '@nestjs/common';

@Injectable()
export class CarsService {

    private cars = [
        {
            id: 1,
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: 2,
            brand: 'Nissan',
            model: 'Micra'
        },
        {
            id: 3,
            brand: 'Porsche',
            model: 'Panamera'
        }
    ];

    findAll(){
        return this.cars;
    }

    findOneById( id: number ) {
        return this.cars.find((car) => car.id === id );
    }

}
