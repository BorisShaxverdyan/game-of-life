import {
    GRASSEATER_ID,
    PREDATOR_ID,
    RABBIT_ID,
} from "../../Constants/entities.js";
import Entities from "../../Services/Entities/index.js";
import Entity from "../Entity/index.js";

class Predator extends Entity {
    public index: number = PREDATOR_ID;

    public eat() {
        super.eat(Entities.grassEater);
        super.eat(Entities.rabbit);
    }

    public mul() {
        super.mul(Entities.predator, Predator);
    }

    public die() {
        super.die(Entities.predator);
    }
}

export default Predator;
