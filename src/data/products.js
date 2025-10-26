import vibrantWatercolorSetImg from './vibrant-watercolor-set.png';
import luxuryRollerballPenImg from './luxury-rollerball-pen.png';
import premiumSketchbookImg from './premium-sketchbook.png';
import diyClayKitImg from './diy-clay-kit.png';
import fineDetailBrushSetImg from './fine-detail-brush-set.png';
import a3CuttingMatImg from './a3-cutting-mat.png';
import pastelAcrylicPaintsImg from './pastel-acrylic-paints.png';
import vintageWashiTapeImg from './vintage-washi-tape.png';

export const BRAND_PINK_TEXT = 'text-[#e54b67]'; 
export const LIGHT_PINK_BG = 'bg-[#ffe1e8]';
export const ACTIVE_BG_COLOR = 'bg-[#ff8ba7]';
export const ACCENT_GREEN_BG = 'bg-[#b7e4c7]';
export const HERO_BLUE_BG = 'bg-[#eaf1ff]';

export const initialProducts = [
    {
        id: 1,
        name: 'Vibrant Watercolor Set',
        description: '12 colors with high pigment saturation and travel brush.',
        price: 35.99,
        imageUrl: vibrantWatercolorSetImg 
    },
    {
        id: 2,
        name: 'Luxury Rollerball Pen',
        description: 'Smooth-writing pen with a sleek, metallic finish.',
        price: 12.99,
        imageUrl: luxuryRollerballPenImg
    },
    {
        id: 3,
        name: 'Premium Sketchbook',
        description: 'Professional-grade sketchbook with heavyweight paper.',
        price: 19.5,
        imageUrl: premiumSketchbookImg
    },
    {
        id: 4,
        name: 'DIY Clay Kit',
        description: 'Everything you need to sculpt and create custom figures.',
        price: 25.0,
        imageUrl: diyClayKitImg
    },
    {
        id: 5,
        name: 'Fine Detail Brush Set',
        description: 'Set of 10 miniature brushes for precision work.',
        price: 15.75,
        imageUrl: fineDetailBrushSetImg
    },
    {
        id: 6,
        name: 'A3 Cutting Mat',
        description: 'Self-healing, double-sided mat with grid lines.',
        price: 18.0,
        imageUrl: a3CuttingMatImg
    },
    {
        id: 7,
        name: 'Pastel Acrylic Paints',
        description: 'Set of 12 soft-hued acrylic paints.',
        price: 28.99,
        imageUrl: pastelAcrylicPaintsImg
    },
    {
        id: 8,
        name: 'Vintage Washi Tape',
        description: '8 rolls of decorative paper tape with vintage patterns.',
        price: 9.99,
        imageUrl: vintageWashiTapeImg
    },
];
