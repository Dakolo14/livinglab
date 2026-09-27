import React from 'react';
import './Products.css';

interface ProductData {
  title: string;
  subtitle: string;
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
        title: "ANTHELIOS UVMUNE400",
        subtitle: "INVISIBLE FLUID SPF50+",
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
        title: "ANTHELIOS INVISIBLE SPRAY",
        subtitle: "SPF50+",
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
        title: "ANTHELIOS INVISIBLE SPRAY",
        subtitle: "DERMO-PEDIATRICS SPF50+",
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
        title: "MELA B3 SERUM",
        subtitle: "INTENSIVE ANTI-DARK SPOTS SERUM\nANTI-RELAPSE EFFICACY",
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
        title: "MELA B3 CLEANSER",
        subtitle: "CLARIFYING MICRO-PEELING GEL",
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
        title: "ANTHELIOS UVMUNE 400",
        subtitle: "ANTI-DARK SPOTS SPF50+",
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
        title: "EFFACLAR MICELLAR WATER ULTRA",
        subtitle: "CLEANSING, MAKE-UP REMOVING AND PURIFYING",
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
        title: "EFFACLAR PURIFYING FOAMING GEL",
        subtitle: "OILY AND SENSITIVE SKIN",
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
        title: "EFFACLAR H ISO-BIOME",
        subtitle: "DERMA-SOOTHING HYDRATING CLEANSING CREAM",
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
        title: "EFFACLAR ULTRA-CONCENTRATED SERUM",
        subtitle: "SALICYLIC ACID SERUM",
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
        title: "EFFACLAR DUO+M",
        subtitle: "ANTI-IMPERFECTIONS TRIPLE CORRECTION CARE",
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
        title: "EFFACLAR H ISO-BIOME",
        subtitle: "HYDRATING CARE ANTI-IMPERFECTIONS",
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
                    <div className="packshot-placeholder">
                      {/* Image placeholder */}
                      <span className="packshot-text">PACKSHOT<br/>{product.title}</span>
                    </div>
                  </div>
                  
                  <div className="product-details">
                    <h4 className="product-title">{product.title}</h4>
                    <p className="product-subtitle">{product.subtitle.split('\n').map((str, k) => <React.Fragment key={k}>{str}<br/></React.Fragment>)}</p>
                    
                    <div className="product-specs">
                      <details className="spec-block" open>
                        <summary className="spec-title">INDICATION <span className="accordion-icon">+</span></summary>
                        <ul className="spec-list">
                          {product.indication.map((item, i) => (
                            <li key={i}><span className="bullet">{'>'}</span> {item}</li>
                          ))}
                        </ul>
                      </details>
                      
                      <details className="spec-block">
                        <summary className="spec-title">ACTION <span className="accordion-icon">+</span></summary>
                        <ul className="spec-list">
                          {product.action.map((item, i) => (
                            <li key={i}><span className="bullet">{'>'}</span> {item}</li>
                          ))}
                        </ul>
                      </details>
                      
                      <details className="spec-block">
                        <summary className="spec-title">USAGE <span className="accordion-icon">+</span></summary>
                        <ul className="spec-list">
                          {product.usage.map((item, i) => (
                            <li key={i}><span className="bullet">{'>'}</span> {item}</li>
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
