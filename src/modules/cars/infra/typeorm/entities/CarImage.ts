import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, PrimaryColumn } from "typeorm";

class CarImage {
    @PrimaryColumn()
    id: string;

    @Column()
    card_id: string;

    @Column()
    image_name: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        }
    }
}

export {CarImage};