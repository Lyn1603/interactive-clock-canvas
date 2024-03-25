import Scene from "../canvas2d/Scene";
import { RotatingArc } from "../canvas2d/shapes/arc";
import { deg2rad } from "../utils/MathUtils";

export default class Scenario extends Scene {
    constructor(id = "canvas") {
        super(id);

        // Dimensions de l'horloge
        this.clockRadius = Math.min(this.width, this.height) * 0.4;
        this.hourHandLength = this.clockRadius * 0.5;
        this.minuteHandLength = this.clockRadius * 0.8;
        this.secondHandLength = this.clockRadius * 0.9;

        // Création des aiguilles
        this.hourHand = new RotatingArc(this.width / 2, this.height / 2, this.hourHandLength, 0, 0);
        this.minuteHand = new RotatingArc(this.width / 2, this.height / 2, this.minuteHandLength, 0, 0);
        this.secondHand = new RotatingArc(this.width / 2, this.height / 2, this.secondHandLength, 0, 0);

        // Initialiser l'horloge
        this.initializeClock();
    }

    initializeClock() {
        // Mettre à jour l'horloge toutes les secondes
        setInterval(() => {
            const now = new Date();
            const hours = now.getHours() % 12; // Format 12 heures
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            const hourAngle = ((hours * 30) + (minutes / 2)) * (Math.PI / 180); // 360 degrés divisé par 12 heures
            const minuteAngle = ((minutes * 6) + (seconds / 10)) * (Math.PI / 180); // 360 degrés divisé par 60 minutes
            const secondAngle = (seconds * 6) * (Math.PI / 180); // 360 degrés divisé par 60 secondes

            this.hourHand.endAngle = hourAngle;
            this.minuteHand.endAngle = minuteAngle;
            this.secondHand.endAngle = secondAngle;


            this.draw(); // Redessiner l'horloge après chaque mise à jour
        }, 1000); // Rafraîchir toutes les secondes
    }

    draw() {
        super.draw();

        // Dessiner le cadran de l'horloge
        this.drawClockFace();

        // Dessiner les aiguilles de l'horloge
        this.drawHand(this.hourHand, 6);
        this.drawHand(this.minuteHand, 4);
        this.drawHand(this.secondHand, 2);
    }

    drawClockFace() {
        // Dessiner le cadran de l'horloge
        this.context.beginPath();
        this.context.arc(this.width / 2, this.height / 2, this.clockRadius, 0, 2 * Math.PI);
        this.context.strokeStyle = "black";
        this.context.lineWidth = 4;
        this.context.stroke();

        // Dessiner les marqueurs des heures
        for (let i = 0; i < 12; i++) {
            const angle = ((i + 10) % 12) * (Math.PI / 6); // Décaler de 9 heures pour placer le "0" en haut
            const x = this.width / 2 + Math.cos(angle) * (this.clockRadius - 40);
            const y = this.height / 2 + Math.sin(angle) * (this.clockRadius - 40);
            this.context.font = "24px Arial";
            this.context.fillStyle = "#333";
            this.context.textAlign = "center";
            this.context.textBaseline = "middle";
            this.context.fillText(((i + 1) % 12).toString(), x, y); // Utiliser ((i + 1) % 12) pour afficher 12 à la place de 0
        }
    }

    drawTime() {
        // Afficher l'heure au centre de l'horloge
        const time = `${this.hour.toString().padStart(2, '0')}:${this.minute.toString().padStart(2, '0')}:${this.second.toString().padStart(2, '0')}`;
        this.context.font = "24px Arial";
        this.context.fillStyle = "#333";
        this.context.textAlign = "center";
        this.context.fillText(time, this.width / 2, this.height / 2 + 50);
    }



}
