import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {

    private cars = ['Nissan', 'Ford', 'Porsche'];

    @Get()
    getAllCars() {
        return this.cars;
    }

    @Get(':id')
    getCarById( @Param('id') id){
        console.log({ id })
        return { car: this.cars[id] };
    }
}
