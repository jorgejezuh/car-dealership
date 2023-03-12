import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dtos';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Nissan',
            model: 'Micra'
        },
        {
            id: uuid(),
            brand: 'Porsche',
            model: 'Panamera'
        }
    ];

    findAll(){
        return this.cars;
    }

    findOneById( id: string ) {
        const car = this.cars.find((car) => car.id === id );

        if( !car ) throw new NotFoundException(`Car with id '${ id }' doesn't exist at database!`);

        return car;
    }

    create( createCarDto: CreateCarDto) {

        const car: Car = {
            id: uuid(),
            brand: createCarDto.brand,
            model: createCarDto.model
        }

        this.cars.push(car);

        return car;
    }

    update( id: string, updateCarDto: UpdateCarDto ) {

        if( updateCarDto.id && updateCarDto.id !== id ) throw new BadRequestException(`Car id is not valid inside body`);

        let carDB = this.findOneById( id );

        this.cars = this.cars.map( car => {
            if( car.id === id ){
                carDB = { ...carDB, ...updateCarDto, id }
                return carDB;
            }

            return car;
        });

        return carDB;

    }

    delete( id: string) {
       const car = this.findOneById(id);
       this.cars = this.cars.filter(car => car.id !== id);

       return 'Car deleted'
    }

}
