import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, CSSRulePlugin);

export { gsap, CSSRulePlugin, ScrollTrigger, ScrollToPlugin };
