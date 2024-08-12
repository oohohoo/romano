import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 
import { initializeApp } from './init.js';

gsap.registerPlugin(ScrollTrigger);

initializeApp();