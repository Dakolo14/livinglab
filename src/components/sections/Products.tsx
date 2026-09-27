import React from 'react';
import { ChevronRight } from 'lucide-react';
import './Products.css';

interface ProductData {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  image?: string;
  indication: string[];
  action: string[];
  usage: string[];
}

interface CategoryData {
  id: string;
  name: string;
  tagline?: string;
  audience: string[];
  products: ProductData[];
}

const productCategories: CategoryData[] = [
  {
    id: "sun-protection",
    name: "SUN PROTECTION",
    audience: [
      "For all skin types.",
      "Daily use.",
      "Adults, children"
    ],
    products: [
      {
        title: <>ANTHELIOS UV<span className="font-light">MUNE</span>400</>,
        subtitle: "INVISIBLE FLUID SPF50+",
        image: "/product-pack/ANTHELIOS UVMUNE400 .png",
        indication: [
          "For people looking for effective daily UV protection",
          "For all sensitive skin types"
        ],
        action: [
          "Protects from deep cellular damage",
          "Ultra-high protection: UVB, UVA and ultra-long UVA, the most insidious kind",
          "Does not sting eyes"
        ],
        usage: [
          "Apply generously before exposure",
          "Reapply frequently to maintain the level of protection"
        ]
      },
      {
        title: <>ANTHELIOS <span className="font-light">INVISIBLE SPRAY</span></>,
        subtitle: "SPF50+",
        image: "/product-pack/ANTHELIOS INVISIBLE SPRAY.png",
        indication: [
          "Sensitive skin"
        ],
        action: [
          "Very high UVA/UVB protection"
        ],
        usage: [
          "Apply generously before exposure",
          "Reapply frequently to maintain protection"
        ]
      },
      {
        title: <>ANTHELIOS <span className="font-light">INVISIBLE SPRAY</span></>,
        subtitle: "DERMO-PEDIATRICS SPF50+",
        image: "/product-pack/ANTHELIOS INVISIBLE SPRAY - DERMO-PEDIATRICS SPF50+ .png",
        indication: [
          "Sensitive skin",
          "Face and body for children"
        ],
        action: [
          "Very high UVA/UVB protection",
          "Water, sand and sweat-resistant",
          "Ultra-high protection: UVB, UVA and ultra-long UVA, the most insidious kind",
          "No white casts"
        ],
        usage: [
          "Apply generously before exposure",
          "Reapply frequently to maintain protection"
        ]
      }
    ]
  },
  {
    id: "mela-b3",
    name: "MELA B3",
    tagline: "HYPERPIGMENTATION",
    audience: [
      "Uneven skin tone and dark spots.",
      "Discover the efficacy of Melasyl™.",
      "Adults"
    ],
    products: [
      {
        title: <>MELA <span className="font-light text-mela-purple">B3</span> <span className="font-light">SERUM</span></>,
        subtitle: <>INTENSIVE ANTI-DARK SPOTS SERUM<br/>ANTI-RELAPSE EFFICACY</>,
        image: "/product-pack/MELA B3 SERUM .png",
        indication: [
          "Uneven skin tone and dark spots"
        ],
        action: [
          "Intercepts excess melanin at a different stage of its production before it marks the skin",
          "[ Melasyl™ ] NEW MULTI-PATENTED ACTIVE",
          "Anti-inflammatory [ 10% Niacinamide + K2G ]",
          "Exfoliates and activates cell renewal [ LHA + Retinyl Palmitate ]",
          "Antioxidant [ Carnosine ]"
        ],
        usage: [
          "Apply morning and evening to the face, neck and hands (if needed)",
          "In the daytime, use in combination with Anthelios Fluid SPF50+ sun protection, depending on your skin type"
        ]
      },
      {
        title: <>MELA <span className="font-light text-mela-purple">B3</span> <span className="font-light">CLEANSER</span></>,
        subtitle: "CLARIFYING MICRO-PEELING GEL",
        image: "/product-pack/MELA B3 CLEANSER .png",
        indication: [
          "Uneven skin tone and dark spots"
        ],
        action: [
          "Intercepts excess melanin at a different stage of its production before it marks the skin",
          "[ Melasyl™ ] NEW MULTI-PATENTED ACTIVE",
          "Anti-inflammatory [ Niacinamide ]",
          "Boosts skin's surface cell renewall [ PHA ]"
        ],
        usage: [
          "Apply morning and evening to wet skin on face, neck & neckline and gently massage in circular motions.",
          "Rinse and dry gently.",
          "Suitable for all skin types, even oily.",
          "Suitable for sensitive skin."
        ]
      },
      {
        title: <>ANTHELIOS UV<span className="font-light">MUNE</span> 400</>,
        subtitle: "ANTI-DARK SPOTS SPF50+",
        image: "/product-pack/ANTHELIOS UVMUNE 400 - Anti Dark Spots.png",
        indication: [
          "Uneven skin tone and dark spots",
          "For people looking for effective daily UV protection"
        ],
        action: [
          "Intercepts excess melanin at a different stage of its production before it marks the skin",
          "[ Melasyl™ ] NEW MULTI-PATENTED ACTIVE",
          "Protects from the most insidious UV rays (380-400nm)",
          "[ Mexoryl 400 ] EXCLUSIVE & PATENTED"
        ],
        usage: [
          "Apply generously before exposure",
          "Reapply frequently to maintain the level of protection"
        ]
      }
    ]
  },
  {
    id: "effaclar",
    name: "EFFACLAR",
    tagline: "ACNE-PRONE SKIN",
    audience: [
      "EFFACLAR is formulated for patients suffering from acne or oily skin with imperfections.",
      "As a monotherapy for mild or moderate acne or an adjunctive treatment (in combination with drugs) for moderate to severe acne.",
      "Teenagers - Adults"
    ],
    products: [
      {
        title: <>EFFACLAR <span className="font-light">MICELLAR WATER ULTRA</span></>,
        subtitle: "CLEANSING, MAKE-UP REMOVING AND PURIFYING",
        image: "/product-pack/EFFACLAR MICELLAR WATER ULTRA.png",
        indication: [
          "Oily and sensitive skin",
          "Acne-prone skin",
          "Skin with severe imperfections"
        ],
        action: [
          "Removes make-up & moisturizes [ Glycerin micelles + physiological pH ]",
          "Purifies the skin, regulates sebum [ Zinc pidolate ]",
          "Physiological pH: 5.5"
        ],
        usage: [
          "Use the micellar water to cleanse the face once or twice a day"
        ]
      },
      {
        title: <>EFFACLAR <span className="font-light">PURIFYING FOAMING GEL</span></>,
        subtitle: "OILY AND SENSITIVE SKIN",
        image: "/product-pack/EFFACLAR PURIFYING FOAMING GEL.png",
        indication: [
          "Oily and sensitive skin",
          "Acne-prone skin",
          "Skin with severe imperfections"
        ],
        action: [
          "Targets IA1 phylotypes of the bacteria C. acnes to correct imperfections [ Phylobioma ] NEW ACTIVE",
          "Gently cleanses [ Syndet ]",
          "Removes impurities and excess sebum [ Zinc pidolate ]",
          "Rebalances pH of acne-prone skin [ Physiological pH : 5 & Soap-free ]"
        ],
        usage: [
          "Lather in the hands with a small amount of water and apply to the face in gentle massaging motions",
          "Rinse thoroughly and pat dry"
        ]
      },
      {
        title: <>EFFACLAR <span className="font-light">H ISO-<span className="text-effaclar-blue">BIOME</span></span></>,
        subtitle: "DERMA-SOOTHING HYDRATING CLEANSING CREAM",
        image: "/product-pack/EFFACLAR H ISO-BIOME .png",
        indication: [
          "Skin dried out by acne treatments"
        ],
        action: [
          "Gently cleanses",
          "Soothes [ Niacinamide + La Roche-Posay Thermal Spring Water ]",
          "Moisturizes [ Glycerin + Shea Butter ]",
          "Restores skin balance [ Aqua Posae Filiformis ]",
          "Reduces imperfections [ Orellana + Procerad™ ]",
          "Physiological pH: 5.5"
        ],
        usage: [
          "Use morning and evening",
          "Lather a small amount of product with some water in the palms of the hands",
          "Apply to a damp face, moving from the middle outward in a single sweep",
          "Rinse thoroughly and pat dry",
          "Avoid the eye contour"
        ]
      },
      {
        title: <>EFFACLAR <span className="font-light">ULTRA-CONCENTRATED SERUM</span></>,
        subtitle: "SALICYLIC ACID SERUM",
        image: "/product-pack/EFFACLAR ULTRA-CONCENTRATED SERUM.png",
        indication: [
          "Oily and sensitive skin",
          "Acne-prone skin",
          "Skin with severe imperfections"
        ],
        action: [
          "Corrects imperfections [ 0.45% Lipohydroxy Acid + Niacinamide ]",
          "Smoothes skin texture [ 1.5% Salicylic acid ]",
          "Reduces fine lines [ 3.5% Glycolic acid ]"
        ],
        usage: [
          "Apply once a day before bed"
        ]
      },
      {
        title: <>EFFACLAR <span className="font-light">DUO+</span>M</>,
        subtitle: "ANTI-IMPERFECTIONS TRIPLE CORRECTION CARE",
        image: "/product-pack/EFFACLAR DUO+M .png",
        indication: [
          "Oily skin and acne-prone skin",
          "Skin with severe imperfections",
          "Blocked pores",
          "Colored marks"
        ],
        action: [
          "Targets C.acnes phylotype IA1 to correct blemishes [ Phylobioma ] NEW ACTIVE",
          "Prevents marks and soothes [ Procerad™ + Niacinamide ]",
          "Gently exfoliates and unclogs pores [ LHA+ Salicylic Acid ]",
          "Controls sebum production [ Zinc PCA ]"
        ],
        usage: [
          "Apply morning and/or evening to the entire face"
        ]
      },
      {
        title: <>EFFACLAR <span className="font-light">H ISO-<span className="text-effaclar-blue">BIOME</span></span></>,
        subtitle: "HYDRATING CARE ANTI-IMPERFECTIONS",
        image: "/product-pack/EFFACLAR H ISO-BIOME HYDRATING CARE ANTI-IMPERFECTIONS.png",
        indication: [
          "Skin dried out by acne treatments"
        ],
        action: [
          "Soothes [ Niacinamide + La Roche-Posay Thermal Spring Water ]",
          "Moisturizes and replenishes lipids [ B5 + Squalane + Glycerin ]",
          "Restores balance to the microbiome [ Aqua Posae Filiformis ]",
          "Limits imperfections & marks [ Orellana + Procerad ™]"
        ],
        usage: [
          "Apply morning and evening to clean and dry skin",
          "TIP: Use CICAPLAST LÈVRES in addition to drying treatments"
        ]
      }
    ]
  },
  {
    id: "lipikar",
    name: "LIPIKAR",
    tagline: "DRY TO VERY DRY, IRRITATED OR ATOPIC ECZEMA-PRONE SKIN",
    audience: [
      "LIPIKAR is formulated for patients suffering from eczema, skin irritation and excessive dryness.",
      "It restores and strengthens the skin's protective barrier thanks to key ingredients.",
      "Body, Children",
      "Newborns - Children - Adults"
    ],
    products: [
      {
        title: <>LIPIKAR <span className="font-light">SURGRAS BAR</span></>,
        subtitle: "ANTI-DRYNESS CLEANSING BAR LIPID-ENRICHED",
        image: "/product-pack/LIPIKAR SURGRAS BAR .png",
        indication: ["Sensitive, dry and uncomfortable skin"],
        action: ["Soothes [ Niacinamide ]", "Repairs and nourishes [ Shea Butter ]", "Cleanse the skin while maintaining the hydrolipidic film"],
        usage: ["Apply to damp skin", "Massage gently, then rinse"]
      },
      {
        title: <>LIPIKAR <span className="font-light">SYNDET AP+</span></>,
        subtitle: <>LIPID-REPLENISHING WASH CREAM<br/>ANTI-IRRITATION ANTI-SCRATCHING</>,
        image: "/product-pack/LIPIKAR SYNDET AP+ .png",
        indication: ["Dry to very dry or atopic eczema-prone skin"],
        action: ["Soothes [ Niacinamide ]", "Repairs, nourishes and protects [ Shea Butter + Glycerin ]", "Restores balance to the microbiome [ Aqua Posae Filiformis ]"],
        usage: ["Apply to moist skin", "Massage gently, then rinse"]
      },
      {
        title: <>LIPIKAR <span className="font-light">CLEANSING OIL AP+</span></>,
        subtitle: <>LIPID-REPLENISHING CLEANSING OIL<br/>ANTI-IRRITATION ANTI-SCRATCHING</>,
        image: "/product-pack/LIPIKAR CLEANSING OIL AP+ .png",
        indication: ["Dry to very dry or atopic eczema-prone skin"],
        action: ["Soothes [ Niacinamide ]", "Repairs, nourishes and protects [ Shea Butter + Glycerin ]", "Restores balance to the microbiome [ Aqua Posae Filiformis ]"],
        usage: ["Place a few drops into the palm of the hand and work into a lather", "Apply to moist skin", "Massage gently, then rinse"]
      },
      {
        title: <>LIPIKAR <span className="font-light">MILK</span></>,
        subtitle: <>48HR LIPID-REPLENISHING<br/>ANTI-DRYNESS BODY MILK</>,
        image: "/product-pack/LIPIKAR MILK .png",
        indication: ["Sensitive and dry skin", "Weakened skin barrier, tightness, discomfort and lack of suppleness"],
        action: ["Repairs, nourishes and protects [ 10% Shea Butter ]", "Repairs & protects [ 60% La Roche-Posay Thermal Spring Water ]", "Comforts dry skin [ Niacinamide ]"],
        usage: ["1 application per day", "On skin cleansed with a gentle soap-free product like LIPIKAR SYNDET AP+ or LIPIKAR CLEANSING OIL AP+"]
      },
      {
        title: <>LIPIKAR <span className="font-light">BALM AP+</span>M<span className="font-light">AX</span></>,
        subtitle: "TRIPLE-ACTION BALM 72H",
        image: "/product-pack/LIPIKAR BALM AP+MAX .png",
        indication: ["Xerosis, senile xerosis, itching, atopic eczema-prone skin"],
        action: ["To mute itch signals on skin [ Neurobioma ]", "Strenghtens skin barrier [ Shea Butter + Glycerin ]", "Soothes skin & reduces irritation [ Neurobioma + Niacinamide ]", "Rebalances skin microbiome & inhibits biofilm formation [ Aqua Posae Filiformis + Microresyl ]"],
        usage: ["1 application per day", "On skin cleansed with a gentle soap-free product like LIPIKAR SYNDET AP+ or LIPIKAR CLEANSING OIL AP+"]
      },
      {
        title: <>LIPIKAR <span className="font-light">MILK <span className="text-effaclar-blue">UREA 10%</span></span></>,
        subtitle: "SMOOTHING MOISTURIZING\nBODY LOTION ANTI-FLAKING",
        image: "/product-pack/LIPIKAR MILK UREA TEN PERCENT.png",
        indication: ["Roughness, flaking, keratosis pilaris, psoriasis-prone skin"],
        action: ["Smoothes skin [ 10% Urea ]", "Lastingly nourishes skin [ Shea Butter + Glycerin ]", "Soothes [ Allantoin + Mannose ]"],
        usage: ["Apply once or twice a day and gently massage in, preferably after washing", "Quickly absorbs and does not leave a greasy film"]
      }
    ]
  },
  {
    id: "cicaplast",
    name: "CICAPLAST",
    tagline: "IRRITATED SKIN",
    audience: [
      "CICAPLAST treats skin irritation, patches, cracks, rough areas, rashes in children, irritation, and superficial burns.",
      "Babies - Children - Adults"
    ],
    products: [
      {
        title: <>CICAPLAST <span className="font-light text-effaclar-blue">B5</span> <span className="font-light">CLEANSER</span></>,
        subtitle: "PURIFYING SOOTHING FOAMING GEL",
        image: "/product-pack/CICAPLAST B5 CLEANSER.png",
        indication: ["Irritated and weakened skin"],
        action: ["Soothes [ 5% Panthenol ]", "Purifies [ Copper ] + [ Zinc ] + [ Manganese ]", "Gentle cleansing base, physiological pH 5.5"],
        usage: ["Apply the foaming gel once or twice a day, work into a lather in the palm of the hand with some water and gently apply to the weakened or irritated area to cleanse it", "Rinse thoroughly and pat dry", "Does not sting the eyes"]
      },
      {
        title: <>CICAPLAST <span className="font-light text-effaclar-blue">B5+</span> <span className="font-light">BALM</span></>,
        subtitle: "ULTRA-REPAIRING SOOTHING BALM",
        image: "/product-pack/CICAPLAST B5+ BALM .png",
        indication: ["Weakened and irritated skin in babies, children and adults", "Sensitive skin following epidermal damage: eczema, diaper rash in babies, perioral irritation, dry patches, chapping, intense dryness, superficial burns, skin irritation, superficial post-laser damage, post-epilation irritation"],
        action: ["Boosts tissue healing [ Tribioma ]", "Soothes [ 5% Panthenol ]", "Repairs [ Madecassoside ]", "Purifies [ Copper ] + [ Zinc ]", "Nourishes and protects [ Shea butter ] + [ Glycerin ]"],
        usage: ["Apply twice a day to the irritated or weakened area after cleansing and drying", "Non-greasy texture that does not leave white marks and is suitable for massaging scars"]
      },
      {
        title: <>CICAPLAST <span className="font-light text-effaclar-blue">B5</span> <span className="font-light">SPRAY</span></>,
        subtitle: <>SOOTHING REPAIRING CONCENTRATE<br/>ANTI-ITCHING</>,
        image: "/product-pack/CICAPLAST B5 SPRAY .png",
        indication: ["Irritated and weakened skin (redness, intense dryness, chapping, etc.)", "Superficial burning sensations"],
        action: ["Soothes and calms itching [ 5% Panthenol ]", "Accelerates epidermal repair [ Madecassoside ]", "Restores balance to the microbiome [ Mannose ] + [ Aqua-Posæ Filiformis ]", "Purifies [ Copper ] + [ Manganese of natural origin ]"],
        usage: ["Spray 15 cm away from skin as often as necessary", "Optimal tolerance tested under dermatological and ophthalmological control", "Invisible texture", "Contact-free use"]
      },
      {
        title: <>CICAPLAST <span className="font-light text-effaclar-blue">B5 GEL</span></>,
        subtitle: "PRO-RECOVERY SKINCARE",
        image: "/product-pack/CICAPLAST B5 GEL .png",
        indication: ["Irritated and weakened skin", "Post sutures", "Post peel", "Post laser"],
        action: ["Soothes [ 5% Panthenol ]", "Repairs [ Madecassoside ]", "Purifies [ Copper ] + [ Zinc ] + [ Manganese ]", "Moisturizing insulating bandage [ Hyaluronic Acid ] [ Silicone ]"],
        usage: ["Apply twice a day to the irritated or weakened area after cleansing and drying", "Invisible, non-sticky bandage texture suitable for massaging scars"]
      },
      {
        title: <>CICAPLAST <span className="font-light text-effaclar-blue">LIPS</span></>,
        subtitle: "PRO-RECOVERY SKINCARE",
        image: "/product-pack/CICAPLAST LIPS .png",
        indication: ["Irritated and weakened skin"],
        action: ["Soothes [ 5% Panthenol ]", "Repairs and protects [ MP lipids ] + [ Shea Butter ]"],
        usage: ["Apply as often as necessary"]
      },
      {
        title: <>CICAPLAST <span className="font-light text-effaclar-blue">HANDS</span></>,
        subtitle: "BARRIER REPAIRING CREAM",
        image: "/product-pack/CICAPLAST HANDS.png",
        indication: ["Damaged and overworked hands", "Domestic and professional use"],
        action: ["Soothes [ 4% Niacinamide ]", "Repairs and protects [ Shea Butter ] + [ 30% Glycerin ]"],
        usage: ["Apply as often as necessary", "Absorbs quickly", "Non-greasy, non-sticky texture"]
      }
    ]
  },
  {
    id: "serums",
    name: "SERUMS",
    tagline: "SENSITIVE SKIN",
    audience: [
      "Dark spots, dull complexion, loss of elasticity, wrinkles, loss of radiance, photoaging.",
      "There is a solution to every concern thanks to La Roche-Posay."
    ],
    products: [
      {
        title: <>PURE <span className="font-light text-c12-orange">VITAMIN C12</span> <span className="font-light">SERUM</span></>,
        subtitle: "ANTI-WRINKLE VITAMIN C SERUM",
        image: "/product-pack/PURE VITAMIN C12 SERUM .png",
        indication: ["Wrinkles, lack of radiance, uneven skin texture"],
        action: ["Improves skin radiance and protects against oxidative stress [ 12% pure Vitamin C ]", "Promotes epidermal renewal [ Salicylic acid ]", "Soothes and softens the skin [ La Roche-Posay Thermal Spring Water ]"],
        usage: ["Apply 3 or 4 drops in the morning to the entire face"]
      },
      {
        title: <>HYALU <span className="font-light text-effaclar-blue">B5</span> <span className="font-light">SURACTIVATED SERUM</span></>,
        subtitle: "3D CONCENTRATE ANTI-WRINKLE REPAIRING REPLUPING",
        image: "/product-pack/HYALU B5 SURACTIVATED .png",
        indication: ["Young to mature sensitive skin", "Dull and tired skin"],
        action: ["Protect skin barrier and retain skin moisture [ High-weighte HA ]", "Repair skin Encapsulated [ HA + Vitamin B5 ]", "Replump skin and correct wrinkles [ Low and micro weight HA ]"],
        usage: ["Apply morning and evening to the face, neck and neckline"]
      },
      {
        title: <>RETINOL <span className="font-light text-b3-red">B3</span> <span className="font-light">SERUM</span></>,
        subtitle: "ANTI-WRINKLE SERUM REGENERATING RESURFACING",
        image: "/product-pack/RETINOL B3 SERUM .png",
        indication: ["Uneven skin tone, photoaging and wrinkles"],
        action: ["Corrects the signs of skin photoaging [ Gradual-release pure retinol ]", "Helps to repair the skin barrier [ Vitamin B3 ]", "Repairs and intensely moisturizes [ Glycerin ]", "High-tolerance formula"],
        usage: ["Apply in the evening to the entire face", "Follow with a moisturizer", "During the daytime, use sun protection"]
      }
    ]
  }
];

const Products: React.FC = () => {
  return (
    <section className="products-section" id="products">
      <div className="products-container">
        


        {productCategories.map((category) => (
          <div key={category.id} className="category-block">
            
            <div className="category-sidebar">
              <div className="category-sidebar-sticky">
                {category.tagline && <div className="category-tagline">{category.tagline}</div>}
                <h3 className="category-name">{category.name}</h3>
                
                <div className="category-audience">
                  <h4>WHO IS IT FOR?</h4>
                  {category.audience.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="category-products">
              {category.products.map((product, idx) => (
                <div key={idx} className="product-card">
                  
                  <div className="product-packshot">
                    {product.image ? (
                      <div className="packshot-image-wrapper">
                        <img src={product.image} alt="Product image" className="packshot-image" />
                      </div>
                    ) : (
                      <div className="packshot-placeholder">
                        <span className="packshot-text">PACKSHOT<br/>{product.title}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="product-details">
                    <h4 className="product-title">{product.title}</h4>
                    <p className="product-subtitle">
                      {typeof product.subtitle === 'string' 
                        ? product.subtitle.split('\n').map((str, k) => <React.Fragment key={k}>{str}<br/></React.Fragment>)
                        : product.subtitle}
                    </p>
                    
                    <div className="product-specs">
                      <details className="spec-block" open>
                        <summary className="spec-title">INDICATION <span className="accordion-icon">+</span></summary>
                        <ul className="spec-list">
                          {product.indication.map((item, i) => (
                            <li key={i}><ChevronRight size={16} className="bullet" /> {item}</li>
                          ))}
                        </ul>
                      </details>
                      
                      <details className="spec-block">
                        <summary className="spec-title">ACTION <span className="accordion-icon">+</span></summary>
                        <ul className="spec-list">
                          {product.action.map((item, i) => (
                            <li key={i}><ChevronRight size={16} className="bullet" /> {item}</li>
                          ))}
                        </ul>
                      </details>
                      
                      <details className="spec-block">
                        <summary className="spec-title">USAGE <span className="accordion-icon">+</span></summary>
                        <ul className="spec-list">
                          {product.usage.map((item, i) => (
                            <li key={i}><ChevronRight size={16} className="bullet" /> {item}</li>
                          ))}
                        </ul>
                      </details>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
