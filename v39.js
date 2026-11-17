/* ===== v39 (2026-11-17): exam model sets in the Lab =====
   Nine v17 demos from exam-demos-b36.json (written for Seth's exams), kept as two sets:
   Computational Methods (5) and Dynamics and Control (4). Neither course has lessons in the app yet, and
   the suggested lessons don't exist, so the sets are standalone in the Lab instead of attached to lessons
   (attaching them to existing lessons would replace those lessons' own models). They show:
   - at the top of the Lab, whatever course it is showing (as two "model set" rows, or in full under
     All courses),
   - as their own entries in the Lab's course menu,
   - in Lab search.
   The JSON is pasted as-is below (spec + verify notes); reg17() registers each spec. "lessons" are empty,
   so nothing in the learning path changes. When lessons for these courses exist, list their ids in a
   spec's "lessons" (or DEMO_OVR) and the model also appears inside the lesson. */
try{FB.ver="b39"}catch(e){}
try{NEWS.unshift({d:"2026-11-17",t:["Lab: two new model sets, Computational Methods (5 models) and Dynamics and Control (4 models). They’re at the top of the Lab and in its course menu."]})}catch(e){}

const XD39=[
  {
    "id": "cmArmijo",
    "course": "Computational Methods",
    "suggestedLesson": "Backtracking line search",
    "spec": {
      "lessons": [],
      "title": "Backtracking finds sufficient decrease",
      "hint": "For f = 2x₁² + x₂², x₀ = (1, 2) and p = (-4, -4), halving α until the point reaches the dashed line gives sufficient decrease. Backtracking starts at 1 with ρ = 0.5.",
      "sliders": [
        {
          "k": "al",
          "label": "Step size α",
          "min": 0.05,
          "max": 1,
          "step": 0.05,
          "value": 1,
          "unit": ""
        },
        {
          "k": "mu",
          "label": "Decrease factor μ₁",
          "min": 0.0001,
          "max": 0.5,
          "step": 0.0001,
          "value": 0.0001,
          "unit": ""
        }
      ],
      "defs": [
        [
          "ph",
          "6-32*al+48*al^2"
        ],
        [
          "lim",
          "6-32*mu*al"
        ],
        [
          "cut",
          "2*(1-mu)/3"
        ],
        [
          "ab",
          "2^floor(ln(cut)/ln(2))"
        ]
      ],
      "view": [
        0,
        1.1,
        -13,
        31
      ],
      "eq": false,
      "axes": true,
      "xl": "α",
      "yl": "φ(α)",
      "h": 240,
      "layers": [
        {
          "t": "fn",
          "f": "6-32*x+48*x^2",
          "from": 0,
          "to": 1.1,
          "c": "blue",
          "w": 2
        },
        {
          "t": "fn",
          "f": "6-32*mu*x",
          "from": 0,
          "to": 1.1,
          "c": "fa",
          "dash": true
        },
        {
          "t": "seg",
          "x0": "al",
          "y0": "lim",
          "x1": "al",
          "y1": "ph",
          "c": "orange",
          "dash": true
        },
        {
          "t": "pt",
          "x": "al",
          "y": "ph",
          "c": "orange",
          "r": 5
        },
        {
          "t": "pt",
          "x": "al",
          "y": "ph",
          "c": "ok",
          "r": 3,
          "when": "lim-ph+0.0000000001"
        },
        {
          "t": "pt",
          "x": "al",
          "y": "ph",
          "c": "bad",
          "r": 3,
          "when": "ph-lim-0.0000000001"
        }
      ],
      "readouts": [
        {
          "label": "φ(α)",
          "f": "ph",
          "unit": "",
          "d": 4,
          "nan": "undefined"
        },
        {
          "label": "Armijo threshold",
          "f": "lim",
          "unit": "",
          "d": 4,
          "nan": "undefined"
        },
        {
          "label": "Sufficient decrease",
          "sign": "lim-ph",
          "pos": "passes",
          "neg": "fails",
          "zero": "passes",
          "tol": 1e-09
        },
        {
          "label": "Accepted α (ρ = 0.5)",
          "f": "ab",
          "unit": "",
          "d": 4,
          "nan": "undefined"
        }
      ],
      "note": "Dashed: Armijo threshold; dot center: pass/fail."
    },
    "verify": {
      "defaults": "φ(α)=6-32α+48α². At α=1, μ₁=0.0001: φ=22, threshold=5.9968 (5.997 at 4 significant figures), verdict fails, accepted α=0.5. At α=0.5: φ=2, threshold=5.9984. The exact minimizer is α=1/3 with φ=2/3. Acceptance is α≤2(1-μ₁)/3, hence the logarithm/floor expression selects the largest accepted power of 1/2.",
      "extremes": "α endpoints 0.05 and 1 and μ₁ endpoints 0.0001 and 0.5, including all corners: finite curves/readouts; accepted step is 0.5 for μ₁≤0.25 and 0.25 above it. At μ₁=0.5, α=0.05 passes (4.52≤5.2), α=1 fails (22>-10). View contains both full curves on [0,1.1]. File-wide validation: strict JSON and v17 field/function checks, 210 default/endpoint/boundary configurations plus 20 low-integral-gain PID cases. All plotted numeric geometry was finite and inside its view; undefined readouts have explicit fallback text. RK4 endpoints were compared with independent affine matrix-exponential solutions (relative/absolute scaled error below 2e-5). Default and extreme plots were inspected using an independent renderer. The actual reg17 implementation was not supplied: host-app import/render behavior, text layout, and zero-based ode.p indexing still need confirmation there."
    }
  },
  {
    "id": "cmPaths",
    "course": "Computational Methods",
    "suggestedLesson": "Gradient descent, Newton and Adam",
    "spec": {
      "lessons": [],
      "title": "Three methods, three steps",
      "hint": "For f = ax₁² + x₂², paths start at (1, 2). First steps move the start along that contour. Newton uses a full step; Adam fixes α = 0.3, with bias correction and ε neglected.",
      "sliders": [
        {
          "k": "al",
          "label": "GD step α",
          "min": 0.02,
          "max": 0.6,
          "step": 0.01,
          "value": 0.1,
          "unit": ""
        },
        {
          "k": "aa",
          "label": "Conditioning a",
          "min": 1,
          "max": 5,
          "step": 0.1,
          "value": 2,
          "unit": ""
        },
        {
          "k": "rr",
          "label": "Start ratio x₂/x₁",
          "min": 0.25,
          "max": 4,
          "step": 0.05,
          "value": 2,
          "unit": ""
        }
      ],
      "defs": [
        [
          "bx",
          "(1-md)+md*sqrt((aa+4)/(aa+rr^2))"
        ],
        [
          "by",
          "2*(1-md)+md*rr*sqrt((aa+4)/(aa+rr^2))"
        ],
        [
          "qx",
          "abs(1-2*aa*al)"
        ],
        [
          "qy",
          "abs(1-2*al)"
        ],
        [
          "ns",
          "min(15,max(1,floor(ln(6)/ln(max(1.000001,qx)))))"
        ],
        [
          "bd",
          "max(2.5,1.2*bx,1.2*by,(1-md)*1.15*qx^ns,md*1.2*abs(bx*(1-2*aa*al)))"
        ]
      ],
      "view": [
        "-bd",
        "bd",
        "-bd",
        "bd"
      ],
      "eq": true,
      "axes": true,
      "xl": "x₁",
      "yl": "x₂",
      "h": 240,
      "layers": [
        {
          "t": "contour",
          "f": "aa*x^2+y^2",
          "levels": [
            1,
            4,
            "aa+4",
            16,
            25
          ],
          "c": "fa",
          "w": 1
        },
        {
          "t": "iter",
          "map": [
            "x-al*2*aa*x",
            "y-al*2*y"
          ],
          "x0": 1,
          "y0": 2,
          "N": "ns",
          "c": "blue",
          "w": 2,
          "when": "1-md"
        },
        {
          "t": "seg",
          "x0": 1,
          "y0": 2,
          "x1": 0,
          "y1": 0,
          "c": "gold",
          "dash": true,
          "when": "1-md"
        },
        {
          "t": "vec",
          "x0": "bx",
          "y0": "by",
          "dx": "-al*2*aa*bx",
          "dy": "-al*2*by",
          "c": "blue",
          "l": "GD",
          "when": "md"
        },
        {
          "t": "vec",
          "x0": "bx",
          "y0": "by",
          "dx": "-bx",
          "dy": "-by",
          "c": "gold",
          "l": "Newton",
          "when": "md"
        },
        {
          "t": "vec",
          "x0": "bx",
          "y0": "by",
          "dx": "-0.3",
          "dy": "-0.3",
          "c": "orange",
          "l": "Adam",
          "when": "md"
        },
        {
          "t": "pt",
          "x": "bx",
          "y": "by",
          "c": "orange",
          "r": 4
        },
        {
          "t": "pt",
          "x": 0,
          "y": 0,
          "c": "ok",
          "r": 3
        }
      ],
      "readouts": [
        {
          "label": "|1 - 2aα|",
          "f": "qx",
          "unit": "",
          "d": 4,
          "nan": "undefined"
        },
        {
          "label": "|1 - 2α|",
          "f": "qy",
          "unit": "",
          "d": 4,
          "nan": "undefined"
        },
        {
          "label": "GD convergence",
          "sign": "1-max(qx,qy)",
          "pos": "converges",
          "neg": "diverges",
          "zero": "does not converge",
          "tol": 1e-09
        }
      ],
      "choices": [
        {
          "k": "md",
          "label": "Show",
          "opts": [
            [
              0,
              "path"
            ],
            [
              1,
              "first steps"
            ]
          ],
          "value": 0
        }
      ],
      "note": "Blue: GD; gold: Newton; orange: start/Adam. Divergent paths shorten.",
      "demoNeeded": "Full Adam path with momentum needs an iterate layer carrying v and s."
    },
    "verify": {
      "defaults": "At a=2, α=0.1, start=(1,2): shrink factors 0.6 and 0.8; verdict converges. GD first point=(0.6,1.6), Newton=(0,0), bias-corrected Adam with α=0.3 gives (0.7,1.7). After 15 GD steps: (0.000470185,0.0703687). First-steps mode at ratio=2 gives the same start and endpoints. At ratio=0.5, a=2, the constant-f=6 start is (1.632993,0.8164966), proportional to (2,1), not literally (2,1): the latter lies on f=9, so cannot also be on the required contour.",
      "extremes": "All α/a/start-ratio endpoint combinations in both modes checked. Positive start coordinates avoid sign(0). Default path has 15 steps; for divergent settings the largest prefix of up to 15 steps that keeps |x₁| near 6 is shown (at least one step). Dynamic symmetric view includes every displayed iterate and all three arrow endpoints. At a=5, α=0.6: factors 5 and 0.2, ns=floor(ln(6)/ln(5))=1, so x₁=-5 and verdict diverges. At aα=1, verdict does not converge."
    }
  },
  {
    "id": "cmKKT",
    "course": "Computational Methods",
    "suggestedLesson": "KKT and active constraints",
    "spec": {
      "lessons": [],
      "title": "An active boundary needs σ ≥ 0",
      "hint": "Minimize (x₁ + 1)² + x₂² with x₁ ≤ c. A negative boundary multiplier means the optimum is interior. At c = -1, the boundary is active with σ = 0. Gradient arrows use scale 0.25.",
      "sliders": [
        {
          "k": "cc",
          "label": "Boundary c",
          "min": -3,
          "max": 2,
          "step": 0.1,
          "value": 1,
          "unit": ""
        }
      ],
      "defs": [
        [
          "sg",
          "-2*(cc+1)"
        ],
        [
          "xs",
          "min(cc,-1)"
        ]
      ],
      "view": [
        -4.5,
        4.5,
        -3,
        3
      ],
      "eq": true,
      "axes": true,
      "xl": "x₁",
      "yl": "x₂",
      "h": 240,
      "layers": [
        {
          "t": "poly",
          "pts": [
            [
              "cc",
              -3
            ],
            [
              4.5,
              -3
            ],
            [
              4.5,
              3
            ],
            [
              "cc",
              3
            ]
          ],
          "fill": "bad",
          "c": "bad",
          "op": 0.07,
          "close": true
        },
        {
          "t": "contour",
          "f": "(x+1)^2+y^2",
          "levels": [
            0.25,
            1,
            4,
            9,
            16
          ],
          "c": "fa",
          "w": 1
        },
        {
          "t": "vline",
          "x": "cc",
          "c": "fa",
          "dash": true
        },
        {
          "t": "pt",
          "x": "cc",
          "y": 0,
          "c": "orange",
          "r": 4
        },
        {
          "t": "vec",
          "x0": "cc",
          "y0": 0,
          "dx": "0.5*(cc+1)",
          "dy": 0,
          "c": "blue",
          "l": "∇f/4"
        },
        {
          "t": "vec",
          "x0": "cc",
          "y0": 0,
          "dx": 0.25,
          "dy": 0,
          "c": "orange",
          "l": "∇g/4"
        },
        {
          "t": "pt",
          "x": "xs",
          "y": 0,
          "c": "ok",
          "r": 5,
          "hollow": true
        }
      ],
      "readouts": [
        {
          "label": "Boundary σ",
          "f": "sg",
          "unit": "",
          "d": 4,
          "nan": "undefined"
        },
        {
          "label": "Boundary test",
          "sign": "sg",
          "pos": "KKT: active",
          "neg": "σ < 0: interior, σ* = 0",
          "zero": "KKT: active, σ* = 0",
          "tol": 1e-09
        },
        {
          "label": "Optimum x₁*",
          "f": "xs",
          "unit": "",
          "d": 4,
          "nan": "undefined"
        },
        {
          "label": "Minimum f*",
          "f": "(xs+1)^2",
          "unit": "",
          "d": 4,
          "nan": "undefined"
        }
      ]
    },
    "verify": {
      "defaults": "At c=1: boundary stationarity gives σ=-2(c+1)=-4; boundary fails dual feasibility, optimum interior with σ*=0; x₁*=-1; f*=0. At c=-2: σ=2, active optimum x₁*=-2, f*=1. At c=-1: active boundary, σ*=0, x₁*=-1, f*=0.",
      "extremes": "c=-3: σ=4, x₁*=-3, f*=4, KKT active. c=2: boundary σ=-6, x₁*=-1, f*=0, interior optimum. Gradients, boundary, and optimum remain in view. Boundary feasibility and complementary slackness hold throughout; multiplier sign decides the boundary test."
    }
  },
  {
    "id": "cmAugLag",
    "course": "Computational Methods",
    "suggestedLesson": "Penalty and augmented Lagrangian",
    "spec": {
      "lessons": [],
      "title": "A multiplier removes penalty bias",
      "hint": "Fix c = -2 and x₂ = 0, so g = x₁ + 2. Penalty approaches feasibility only as μ grows. In augmented Lagrangian mode, λ̄ = 2 puts the minimum exactly at -2 for any μ.",
      "sliders": [
        {
          "k": "mu",
          "label": "Penalty μ",
          "min": 0.1,
          "max": 50,
          "step": 0.1,
          "value": 1,
          "unit": ""
        },
        {
          "k": "lb",
          "label": "Multiplier λ̄",
          "min": 0,
          "max": 4,
          "step": 0.1,
          "value": 0,
          "unit": ""
        }
      ],
      "defs": [
        [
          "ll",
          "md*lb"
        ],
        [
          "xa",
          {
            "argmin": "(x+1)^2+ll*max(x+2,-ll/mu)+mu*max(x+2,-ll/mu)^2/2",
            "a": -4,
            "b": 1
          }
        ],
        [
          "xs",
          "xa-(2*(xa+1)+ll+mu*(xa+2))/(2+mu)"
        ],
        [
          "gg",
          "xs+2"
        ],
        [
          "gb",
          "max(gg,-ll/mu)"
        ],
        [
          "fv",
          "(xs+1)^2+ll*gb+mu*gb^2/2"
        ],
        [
          "lo",
          "min(-1,fv-1)"
        ],
        [
          "hi",
          "max(11,6+3*ll+4.5*mu)"
        ]
      ],
      "view": [
        -4,
        1,
        "lo",
        "hi"
      ],
      "eq": false,
      "axes": true,
      "xl": "x₁",
      "yl": "Objective",
      "h": 240,
      "layers": [
        {
          "t": "fn",
          "f": "(x+1)^2",
          "from": -4,
          "to": 1,
          "c": "fa",
          "dash": true
        },
        {
          "t": "fn",
          "f": "(x+1)^2+ll*max(x+2,-ll/mu)+mu*max(x+2,-ll/mu)^2/2",
          "from": -4,
          "to": 1,
          "c": "blue",
          "w": 2
        },
        {
          "t": "vline",
          "x": -2,
          "c": "ok",
          "dash": true
        },
        {
          "t": "pt",
          "x": "xs",
          "y": "fv",
          "c": "orange",
          "r": 5
        }
      ],
      "readouts": [
        {
          "label": "Minimizer x₁",
          "f": "xs",
          "unit": "",
          "d": 4,
          "nan": "undefined"
        },
        {
          "label": "Constraint g (≤ 0)",
          "f": "gg",
          "unit": "",
          "d": 4,
          "nan": "undefined"
        },
        {
          "label": "Next λ̄ (projected)",
          "f": "max(0,ll+mu*gg)",
          "unit": "",
          "d": 4,
          "nan": "undefined"
        },
        {
          "label": "Distance to x₁*",
          "f": "abs(xs+2)",
          "unit": "",
          "d": 4,
          "nan": "undefined"
        }
      ],
      "choices": [
        {
          "k": "md",
          "label": "Method",
          "opts": [
            [
              0,
              "exterior penalty"
            ],
            [
              1,
              "augmented Lagrangian"
            ]
          ],
          "value": 0
        }
      ],
      "note": "Dashed gray: f alone; green: true optimum."
    },
    "verify": {
      "defaults": "Penalty default μ=1, λ̄=0: derivative 2(x+1)+μ(x+2)=0 gives x₁=-4/3=-1.333333; g=2/3=0.6666667; next projected multiplier=2/3=0.6666667; distance=2/3=0.6666667. The 600-point argmin is corrected by one exact quadratic Newton step to remove scan-grid error; x₁=-(2+2μ+λ̄)/(2+μ). AL with λ̄=2 gives x₁=-2, g=0, next λ̄=2, distance=0 at every μ. Uses λ̄+μḡ=max(0,λ̄+μg), as on the equation sheet, rather than an unprojected general update.",
      "extremes": "Both modes, μ=0.1/50 and λ̄=0/4 checked. Penalty minimizers range -1.047619 to -1.961538; violation 0.952381 to 0.0384615. AL with λ̄=4: μ=0.1 gives x₁=-2.952381, g=-0.952381, next λ̄=3.904762; μ=50 gives x₁=-2.038462, g=-0.0384615, next λ̄=2.076923. Full objective curves and minima are within the adaptive vertical range. A negative g is feasible slack, not positive violation. λ̄ is ignored in penalty mode; next multiplier there means the first AL update starting from zero."
    }
  },
  {
    "id": "cmR2",
    "course": "Computational Methods",
    "suggestedLesson": "Least squares and r²",
    "spec": {
      "lessons": [],
      "title": "r² is the fraction explained",
      "hint": "Eight points use yᵢ = 0.5 + bxᵢ + seᵢ, with fixed noise. Changing b alters total variation but leaves residual error unchanged. A flat, noiseless dataset has no variance, so r² is undefined.",
      "sliders": [
        {
          "k": "ss",
          "label": "Noise scale s",
          "min": 0,
          "max": 2,
          "step": 0.1,
          "value": 0.3,
          "unit": ""
        },
        {
          "k": "bb",
          "label": "True slope b",
          "min": 0,
          "max": 1.2,
          "step": 0.05,
          "value": 0.6,
          "unit": ""
        }
      ],
      "defs": [
        [
          "yy1",
          "0.5+bb*1+ss*(0.8)"
        ],
        [
          "yy2",
          "0.5+bb*2+ss*(-0.6)"
        ],
        [
          "yy3",
          "0.5+bb*3+ss*(-1.1)"
        ],
        [
          "yy4",
          "0.5+bb*4+ss*(0.9)"
        ],
        [
          "yy5",
          "0.5+bb*5+ss*(0.3)"
        ],
        [
          "yy6",
          "0.5+bb*6+ss*(-0.9)"
        ],
        [
          "yy7",
          "0.5+bb*7+ss*(1)"
        ],
        [
          "yy8",
          "0.5+bb*8+ss*(-0.4)"
        ],
        [
          "sx",
          {
            "sum": "k",
            "a": 1,
            "b": 8
          }
        ],
        [
          "sxx",
          {
            "sum": "k^2",
            "a": 1,
            "b": 8
          }
        ],
        [
          "sy",
          "yy1+yy2+yy3+yy4+yy5+yy6+yy7+yy8"
        ],
        [
          "sxy",
          "1*yy1+2*yy2+3*yy3+4*yy4+5*yy5+6*yy6+7*yy7+8*yy8"
        ],
        [
          "aone",
          "(8*sxy-sx*sy)/(8*sxx-sx^2)"
        ],
        [
          "azero",
          "(sy-aone*sx)/8"
        ],
        [
          "ym",
          "sy/8"
        ],
        [
          "sr",
          "(yy1-azero-aone*1)^2+(yy2-azero-aone*2)^2+(yy3-azero-aone*3)^2+(yy4-azero-aone*4)^2+(yy5-azero-aone*5)^2+(yy6-azero-aone*6)^2+(yy7-azero-aone*7)^2+(yy8-azero-aone*8)^2"
        ],
        [
          "st",
          "(yy1-ym)^2+(yy2-ym)^2+(yy3-ym)^2+(yy4-ym)^2+(yy5-ym)^2+(yy6-ym)^2+(yy7-ym)^2+(yy8-ym)^2"
        ],
        [
          "lo",
          "min(0,yy1,yy2,yy3,yy4,yy5,yy6,yy7,yy8,azero+aone*0.5,azero+aone*8.5)-0.4"
        ],
        [
          "hi",
          "max(1,yy1,yy2,yy3,yy4,yy5,yy6,yy7,yy8,azero+aone*0.5,azero+aone*8.5)+0.9"
        ]
      ],
      "view": [
        0.5,
        8.5,
        "lo",
        "hi"
      ],
      "eq": false,
      "axes": true,
      "xl": "x",
      "yl": "y",
      "h": 240,
      "layers": [
        {
          "t": "seg",
          "x0": 1,
          "y0": "yy1",
          "x1": 1,
          "y1": "azero+aone*1",
          "c": "bad",
          "w": 1
        },
        {
          "t": "seg",
          "x0": 2,
          "y0": "yy2",
          "x1": 2,
          "y1": "azero+aone*2",
          "c": "bad",
          "w": 1
        },
        {
          "t": "seg",
          "x0": 3,
          "y0": "yy3",
          "x1": 3,
          "y1": "azero+aone*3",
          "c": "bad",
          "w": 1
        },
        {
          "t": "seg",
          "x0": 4,
          "y0": "yy4",
          "x1": 4,
          "y1": "azero+aone*4",
          "c": "bad",
          "w": 1
        },
        {
          "t": "seg",
          "x0": 5,
          "y0": "yy5",
          "x1": 5,
          "y1": "azero+aone*5",
          "c": "bad",
          "w": 1
        },
        {
          "t": "seg",
          "x0": 6,
          "y0": "yy6",
          "x1": 6,
          "y1": "azero+aone*6",
          "c": "bad",
          "w": 1
        },
        {
          "t": "seg",
          "x0": 7,
          "y0": "yy7",
          "x1": 7,
          "y1": "azero+aone*7",
          "c": "bad",
          "w": 1
        },
        {
          "t": "seg",
          "x0": 8,
          "y0": "yy8",
          "x1": 8,
          "y1": "azero+aone*8",
          "c": "bad",
          "w": 1
        },
        {
          "t": "fn",
          "f": "azero+aone*x",
          "from": 0.5,
          "to": 8.5,
          "c": "blue",
          "w": 2
        },
        {
          "t": "pts",
          "pts": [
            [
              1,
              "yy1"
            ],
            [
              2,
              "yy2"
            ],
            [
              3,
              "yy3"
            ],
            [
              4,
              "yy4"
            ],
            [
              5,
              "yy5"
            ],
            [
              6,
              "yy6"
            ],
            [
              7,
              "yy7"
            ],
            [
              8,
              "yy8"
            ]
          ],
          "c": "orange",
          "r": 3
        },
        {
          "t": "text",
          "x": 0.9,
          "y": "hi-0.3",
          "s": "a₀ = {round(10000*azero)/10000}",
          "anc": "start",
          "c": "blue"
        }
      ],
      "readouts": [
        {
          "label": "Residual Sᵣ",
          "f": "sr",
          "unit": "",
          "d": 4,
          "nan": "undefined"
        },
        {
          "label": "Total Sₜ",
          "f": "st",
          "unit": "",
          "d": 4,
          "nan": "undefined"
        },
        {
          "label": "r²",
          "f": "(st-sr)/st",
          "unit": "",
          "d": 4,
          "nan": "undefined: constant data"
        },
        {
          "label": "Fitted a₁",
          "f": "aone",
          "unit": "",
          "d": 4,
          "nan": "undefined"
        }
      ]
    },
    "verify": {
      "defaults": "Σx=36, Σx²=204, Σe=0, Σxe=-0.2, Σe²=5.08. Thus a₁=b-s/210 and a₀=0.5+3s/140. At s=0.3, b=0.6: a₀=0.506428571 (plot 0.5064), a₁=0.598571429 (0.5986), Sᵣ=(5.08-0.04/42)s²=0.457114286 (0.4571), Sₜ=42b²-0.4bs+5.08s²=15.5052 (15.51), r²=0.970518646 (0.9705). At s=1.5, b=0.6: r²=0.563655703 (0.5637). Intercept is displayed on-plot to keep four readouts.",
      "extremes": "Both noise endpoints 0/2 and slope endpoints 0/1.2 checked together. s=0,b>0 yields r²=1; s=0,b=0 gives Sᵣ=Sₜ=0 and the explicit undefined: constant data fallback. s=2,b=0: Sᵣ=20.3161905, Sₜ=20.32, r²=0.0001874766. Coefficients, residual segments, and all eight points stay inside data-derived view limits. This is a linear-fit demo; no polynomial-regression demo was requested among the nine IDs."
    }
  },
  {
    "id": "ctRouth",
    "course": "Dynamics and Control",
    "suggestedLesson": "Routh stability and feedback gain",
    "spec": {
      "lessons": [],
      "title": "Routh predicts the stability limit",
      "hint": "Unity feedback around K/[s(s + 1)(s + 5)] gives s³ + 6s² + 5s + K. With zero initial state and a unit step, K = 30 sustains oscillations; larger K makes them grow.",
      "sliders": [
        {
          "k": "kg",
          "label": "Loop gain K",
          "min": 1,
          "max": 40,
          "step": 1,
          "value": 10,
          "unit": ""
        }
      ],
      "defs": [
        [
          "rh",
          "(30-kg)/6"
        ],
        [
          "rp",
          {
            "root": "x^3+6*x^2+5*x+kg",
            "a": -8,
            "b": -5
          }
        ],
        [
          "amp",
          "max(2,2*exp(20*max(0,(-6-rp)/2)))"
        ],
        [
          "valid",
          "min(1,max(0,ceil(30-kg)))"
        ]
      ],
      "view": [
        0,
        20,
        "1-amp",
        "1+amp"
      ],
      "eq": false,
      "axes": true,
      "xl": "Time (s)",
      "yl": "Output",
      "h": 240,
      "layers": [
        {
          "t": "hline",
          "y": 1,
          "c": "fa",
          "dash": true
        },
        {
          "t": "ode",
          "eqs": [
            "y2",
            "y3",
            "kg*(1-y1)-6*y3-5*y2"
          ],
          "y0": [
            0,
            0,
            0
          ],
          "t1": 20,
          "n": 2000,
          "p": 0,
          "c": "blue",
          "w": 2
        }
      ],
      "readouts": [
        {
          "label": "Routh s¹ entry",
          "f": "rh",
          "unit": "",
          "d": 4,
          "nan": "undefined"
        },
        {
          "label": "Stability",
          "sign": "30-kg",
          "pos": "stable",
          "neg": "unstable",
          "zero": "marginal: sustained oscillation",
          "tol": 1e-09
        },
        {
          "label": "Margin frequency",
          "f": "sqrt(5)",
          "unit": "rad/s",
          "d": 4,
          "nan": "undefined"
        },
        {
          "label": "Steady-state output",
          "f": "valid/valid",
          "unit": "",
          "d": 4,
          "nan": "no limit: not asymptotically stable"
        }
      ]
    },
    "verify": {
      "defaults": "K=10: Routh column=[1,6,20/6,10], so s¹ entry=3.333333 (3.333), verdict stable, boundary oscillation frequency √5=2.236068 rad/s (2.236), steady-state output=1. At K=30 polynomial=(s+6)(s²+5), marginal oscillation at √5; no steady-state limit. The frequency readout is the frequency AT THE MARGIN, not the current damped frequency.",
      "extremes": "K=1 and 40, plus exact margin K=30, checked by RK4 and independent linear-system calculations. K=1: Routh entry=4.833333, stable, steady-state=1. K=40: entry=-1.666667, unstable, steady-state shows no limit. Root bracket [-8,-5] changes sign for every allowed K. Adaptive y limits use a growing-mode envelope to retain the unstable response, not claim a steady state. ODE uses 2000 steps over 20 s. Assumption requiring importer confirmation: ode.p=0 denotes y1 (zero-based state index); the handoff does not explicitly specify the index base."
    }
  },
  {
    "id": "ctAttitude",
    "course": "Dynamics and Control",
    "suggestedLesson": "Spacecraft PD feedback",
    "spec": {
      "lessons": [],
      "title": "PD damps a spacecraft attitude",
      "hint": "Fix J = 10 kg·m², zero initial motion and a 1 rad command. P alone leaves undamped oscillations; D dissipates motion. The 2% settling-time estimate applies only to underdamped responses; overdamped systems can be much slower.",
      "sliders": [
        {
          "k": "kp",
          "label": "Proportional Kp",
          "min": 1,
          "max": 40,
          "step": 1,
          "value": 10,
          "unit": "N·m/rad"
        },
        {
          "k": "kd",
          "label": "Derivative Kd",
          "min": 0,
          "max": 40,
          "step": 1,
          "value": 14,
          "unit": "N·m·s/rad"
        }
      ],
      "defs": [
        [
          "wn",
          "sqrt(kp/10)"
        ],
        [
          "zz",
          "kd/(2*sqrt(10*kp))"
        ],
        [
          "ud",
          "min(1,max(0,ceil(1-zz)))"
        ]
      ],
      "view": [
        0,
        15,
        -0.1,
        2.15
      ],
      "eq": false,
      "axes": true,
      "xl": "Time (s)",
      "yl": "θ (rad)",
      "h": 240,
      "layers": [
        {
          "t": "fill",
          "f": "1.02",
          "g": "0.98",
          "from": 0,
          "to": 15,
          "c": "fa",
          "op": 0.1
        },
        {
          "t": "hline",
          "y": 1,
          "c": "fa",
          "dash": true
        },
        {
          "t": "ode",
          "eqs": [
            "y2",
            "(kp*(1-y1)-kd*y2)/10"
          ],
          "y0": [
            0,
            0
          ],
          "t1": 15,
          "n": 1500,
          "p": 0,
          "c": "blue",
          "w": 2
        }
      ],
      "readouts": [
        {
          "label": "Natural frequency ωₙ",
          "f": "wn",
          "unit": "rad/s",
          "d": 4,
          "nan": "undefined"
        },
        {
          "label": "Damping ratio ζ",
          "f": "zz",
          "unit": "",
          "d": 4,
          "nan": "undefined"
        },
        {
          "label": "Overshoot",
          "f": "100*exp(-zz*pi/sqrt(max(0.000001,1-zz^2)))*ud",
          "unit": "%",
          "d": 4,
          "nan": "none (ζ ≥ 1)"
        },
        {
          "label": "tₛ ≈ (underdamped only)",
          "f": "80*kd*ud/(kd^2*ud^2)",
          "unit": "s",
          "d": 4,
          "nan": "N/A: undamped or ζ ≥ 1"
        }
      ]
    },
    "verify": {
      "defaults": "Kp=10, Kd=14, J=10: ωₙ=√(10/10)=1 rad/s; ζ=14/(2√100)=0.7; %OS=100 exp(-0.7π/√0.51)=4.598791% (4.599%, or 4.60% at 3 sf); tₛ≈4/(0.7×1)=5.714286 s (5.714). Initial state=(0,0), reference=1 rad.",
      "extremes": "All Kp=1/40 and Kd=0/40 corners, plus ζ=1, checked. Kd=0 gives ζ=0, 100% peak overshoot and explicit N/A settling time: oscillation never settles. At ζ≥1, overshoot is exactly 0% via a gate and safe square root; settling estimate is N/A. The safe square-root floor is inactive at every reachable underdamped slider setting. The full response stays between 0 and 2 rad. Small Kp with large Kd may not settle within 15 s; no false finite settling estimate is reported. ode.p=0 assumes zero-based indexing."
    }
  },
  {
    "id": "ctQuadAlt",
    "course": "Dynamics and Control",
    "suggestedLesson": "Altitude control and steady-state error",
    "spec": {
      "lessons": [],
      "title": "Gravity causes a tracking offset",
      "hint": "Fix m = 1.2 kg, g = 9.81 m/s², zero initial states and z_ref = 1 m. Feedforward cancels gravity; stable integral feedback removes its offset. Signed thrust is idealized, with no saturation. Ki matters only in PID.",
      "sliders": [
        {
          "k": "kp",
          "label": "Proportional Kp",
          "min": 5,
          "max": 80,
          "step": 1,
          "value": 40,
          "unit": "N/m"
        },
        {
          "k": "kd",
          "label": "Derivative Kd",
          "min": 2,
          "max": 30,
          "step": 1,
          "value": 10,
          "unit": "N·s/m"
        },
        {
          "k": "ki",
          "label": "Integral Ki",
          "min": 0,
          "max": 100,
          "step": 1,
          "value": 40,
          "unit": "N/(m·s)"
        }
      ],
      "defs": [
        [
          "ff",
          "1-abs(md-1)"
        ],
        [
          "ii",
          "max(0,md-1)*ki"
        ],
        [
          "has",
          "min(1,ceil(ii))"
        ],
        [
          "margin",
          "kd*kp-1.2*ii"
        ],
        [
          "valid",
          "(1-has)+has*min(1,max(0,ceil(margin)))"
        ],
        [
          "err",
          "(1-ff)*(1-has)*1.2*9.81/kp"
        ],
        [
          "rp",
          {
            "root": "1.2*x^3+kd*x^2+kp*x+max(ii,0.000001)",
            "a": -40,
            "b": 0
          }
        ],
        [
          "amp",
          "max(2,2*abs(1-(1-ff)*1.2*9.81/kp),2*exp(10*max(0,(-kd/1.2-rp)/2)))"
        ]
      ],
      "view": [
        0,
        10,
        "1-amp",
        "1+amp"
      ],
      "eq": false,
      "axes": true,
      "xl": "Time (s)",
      "yl": "Altitude (m)",
      "h": 240,
      "layers": [
        {
          "t": "hline",
          "y": 1,
          "c": "fa",
          "dash": true
        },
        {
          "t": "ode",
          "eqs": [
            "y2",
            "(kp*(1-y1)-kd*y2+ii*y3)/1.2-(1-ff)*9.81",
            "1-y1"
          ],
          "y0": [
            0,
            0,
            0
          ],
          "t1": 10,
          "n": 2000,
          "p": 0,
          "c": "blue",
          "w": 2
        }
      ],
      "readouts": [
        {
          "label": "Steady-state error",
          "f": "err*valid/(valid^2)",
          "unit": "m",
          "d": 4,
          "nan": "no limit: unstable/marginal"
        },
        {
          "label": "Steady-state altitude",
          "f": "(1-err)*valid/(valid^2)",
          "unit": "m",
          "d": 4,
          "nan": "no limit: unstable/marginal"
        },
        {
          "label": "Output stability",
          "sign": "(1-has)+has*margin",
          "pos": "stable",
          "neg": "unstable",
          "zero": "marginal: no settling",
          "tol": 1e-09
        },
        {
          "label": "PID Routh margin",
          "f": "has*margin/has",
          "unit": "",
          "d": 4,
          "nan": "N/A: integral gain is zero"
        }
      ],
      "choices": [
        {
          "k": "md",
          "label": "Controller",
          "opts": [
            [
              0,
              "PD"
            ],
            [
              1,
              "PD + gravity feedforward"
            ],
            [
              2,
              "PID"
            ]
          ],
          "value": 0
        }
      ]
    },
    "verify": {
      "defaults": "Default PD: e_ss=mg/Kp=1.2×9.81/40=0.2943 m; z_ss=1-0.2943=0.7057 m; output stable; PID Routh margin N/A because integral gain is zero in PD. Switching to feedforward: e_ss=0, z_ss=1, stable, margin N/A. Switching to PID at Ki=40: e_ss=0, z_ss=1, stable; KdKp-mKi=400-48=352. PID contains no gravity feedforward.",
      "extremes": "All 24 mode/slider endpoint combinations checked, plus PID Kp=6,Kd=2,Ki=10 (exact Routh margin zero). With Ki=0, PID reduces to PD: nonzero mg/Kp error is retained and the unused integral state does not make the output unstable. For Ki>0, finite steady-state readouts require KdKp>mKi; marginal/unstable cases explicitly show no limit. The negative-root bracket [-40,0] always changes sign because max(ii,1e-6)>0; this tiny floor affects the view envelope only, never the dynamics or readouts. Dynamic y bounds contain the plotted growing oscillations; 2000 RK4 steps over 10 s remain finite. ode.p=0 assumes zero-based indexing. Additional Ki=1,2,3,5,8 with Kp=5 and Kd=2,5,10,30 were tested. The view also accounts for the gravity-driven initial dip even when integral feedback ultimately removes the offset; for Kp=5,Kd=2,Ki=1 the minimum is about -1.38532 m, safely within the view."
    }
  },
  {
    "id": "ctSpecRegion",
    "course": "Dynamics and Control",
    "suggestedLesson": "Overshoot and settling-time regions",
    "spec": {
      "lessons": [],
      "title": "Pole locations must meet both specs",
      "hint": "Choose an overshoot/2% settling-time pair. Standard zero-free second-order predictions require poles inside the damping wedge and left of Re(s) = -4/tₛ. Both bounds must hold; settling time is approximate, especially for repeated real poles.",
      "sliders": [
        {
          "k": "sig",
          "label": "Pole real part σ",
          "min": -8,
          "max": 0,
          "step": 0.1,
          "value": -3,
          "unit": "1/s"
        },
        {
          "k": "wd",
          "label": "Pole frequency ωd",
          "min": 0,
          "max": 8,
          "step": 0.1,
          "value": 3,
          "unit": "rad/s"
        }
      ],
      "defs": [
        [
          "bzero",
          "max(0,1-pr)"
        ],
        [
          "bone",
          "1-abs(pr-1)"
        ],
        [
          "btwo",
          "max(0,pr-1)"
        ],
        [
          "os",
          "0.1*bzero+0.05*bone+0.2*btwo"
        ],
        [
          "st",
          "2*bzero+bone+3*btwo"
        ],
        [
          "zm",
          "-ln(os)/sqrt(pi^2+ln(os)^2)"
        ],
        [
          "rs",
          "pi/(-ln(os))"
        ],
        [
          "edge",
          "-4/st"
        ],
        [
          "pmrg",
          "min(-sig-4/st,-sig*rs-wd)"
        ],
        [
          "osc",
          "min(1,ceil(wd))"
        ],
        [
          "orig",
          "min(1,ceil(abs(sig)+wd))"
        ]
      ],
      "view": [
        -9,
        0.5,
        -9,
        9
      ],
      "eq": true,
      "axes": true,
      "xl": "Re(s) (1/s)",
      "yl": "Im(s) (rad/s)",
      "h": 240,
      "layers": [
        {
          "t": "fill",
          "f": "min(9,-x*rs)",
          "g": "-min(9,-x*rs)",
          "from": -9,
          "to": "edge",
          "c": "ok",
          "op": 0.12
        },
        {
          "t": "fn",
          "f": "-x*rs",
          "from": "-min(9,9/rs)",
          "to": 0,
          "c": "fa",
          "dash": true
        },
        {
          "t": "fn",
          "f": "x*rs",
          "from": "-min(9,9/rs)",
          "to": 0,
          "c": "fa",
          "dash": true
        },
        {
          "t": "vline",
          "x": "edge",
          "c": "fa",
          "dash": true
        },
        {
          "t": "pt",
          "x": "sig",
          "y": "wd",
          "c": "orange",
          "r": 5
        },
        {
          "t": "pt",
          "x": "sig",
          "y": "wd",
          "c": "bad",
          "r": 3,
          "when": "-pmrg-0.000000001"
        },
        {
          "t": "pt",
          "x": "sig",
          "y": "-wd",
          "c": "orange",
          "r": 5
        },
        {
          "t": "pt",
          "x": "sig",
          "y": "-wd",
          "c": "bad",
          "r": 3,
          "when": "-pmrg-0.000000001"
        }
      ],
      "readouts": [
        {
          "label": "Pole damping ratio ζ",
          "f": "abs(sig)/sqrt(sig^2+wd^2)",
          "unit": "",
          "d": 4,
          "nan": "undefined: pole at origin"
        },
        {
          "label": "Predicted overshoot",
          "f": "100*exp(pi*sig/max(wd,0.000001))*osc*orig/orig",
          "unit": "%",
          "d": 4,
          "nan": "undefined: pole at origin"
        },
        {
          "label": "tₛ ≈",
          "f": "4*abs(sig)/(sig^2)",
          "unit": "s",
          "d": 4,
          "nan": "no settling: σ = 0"
        },
        {
          "label": "Both specifications",
          "sign": "pmrg",
          "pos": "passes",
          "neg": "fails",
          "zero": "passes (on boundary)",
          "tol": 1e-09
        }
      ],
      "choices": [
        {
          "k": "pr",
          "label": "Max %OS / max tₛ",
          "opts": [
            [
              0,
              "10% / 2 s"
            ],
            [
              1,
              "5% / 1 s"
            ],
            [
              2,
              "20% / 3 s"
            ]
          ],
          "value": 0
        }
      ]
    },
    "verify": {
      "defaults": "Default specs OS≤10%, tₛ≤2 s: ζ_min=-ln(0.1)/√(π²+ln²(0.1))=0.5911550; ray slope=π/(-ln0.1)=1.364376, angle=53.76098° from the negative real axis; vertical limit Re(s)=-2. Pole pair -3±3j: ζ=3/√18=0.7071068 (0.7071), %OS=100 exp(-π)=4.321392% (4.321), tₛ≈4/3=1.333333 s (1.333); verdict passes. Rays use slope directly; no unsupported arccos function.",
      "extremes": "All three presets and σ=-8/0, ωd=0/8 endpoint combinations checked, plus exact time and wedge boundaries. σ<0,ωd=0 is the repeated-real-pole limit: ζ=1, overshoot=0 (handled explicitly in final expression), tₛ≈4/|σ|. σ=0,ωd>0 gives ζ=0, 100% overshoot and no settling; σ=ωd=0 has undefined ζ/overshoot and no settling, with explicit fallback text. All poles and shaded intersections remain in view. The pass/fail readout uses direct inequalities, so undefined origin metrics can never accidentally pass. The tₛ condition is the standard 2% design approximation, not an exact settling-time certificate."
    }
  }
];

const XS39=[{id:"x:cm",n:"Computational Methods",course:"Computational Methods"},{id:"x:dc",n:"Dynamics and Control",course:"Dynamics and Control"}];
/* phone fit: the plot's top-right note has room for about 36 characters at 393 px */
const XN39={cmArmijo:{note:"dashed: threshold · dot: pass/fail"},cmAugLag:{note:"dashed: f alone · green: optimum"},
 cmPaths:{note:"GD blue · Newton gold · Adam orange",hint:" Orange also marks the start; divergent GD paths are cut short."}};
XD39.forEach(d=>{try{const o=XN39[d.id];if(o){if(o.note)d.spec.note=o.note;if(o.hint)d.spec.hint+=o.hint}if(!DEMOS[d.id])reg17(d.id,d.spec)}catch(e){}});
let LABX39=null;
const xItems39=(sid,q)=>{const s=XS39.find(z=>z.id==sid);return XD39.filter(d=>s&&d.course==s.course&&DEMOS[d.id]&&(!q||(d.suggestedLesson+" "+d.spec.title+" "+d.course).toLowerCase().indexOf(q)>=0))};
const xRows39=items=>items.map(d=>`<div class="labrow"><button class="labgo" onclick="labX39('${esc(d.id)}')"><span class="grow"><b>${esc(d.suggestedLesson)}</b><small>${esc(d.spec.title)} · model</small></span></button><button class="labflask" onclick="labX39('${esc(d.id)}')" aria-label="Open the model: ${esc(d.suggestedLesson)}">${IC.flask}</button></div>`).join("");
function xSet39(sid,q,head){const s=XS39.find(z=>z.id==sid),it=xItems39(sid,q);if(!it.length)return"";
 return (head?`<div class="fieldh"><h2>${esc(s.n)}</h2><small>${it.length} model${it.length>1?"s":""}</small></div>`:"")+`<div class="labu" style="--uc:var(--blue)"><p class="labuh">${esc(s.n)} · models</p>${xRows39(it)}</div>`}

/* Lab list */
const _lr39=labRender;labRender=function(){const c=labCur(),box=$("#labres"),q=LABQ.trim().toLowerCase();
 if(XS39.some(s=>s.id==c)){if(box)box.innerHTML=xSet39(c,q,false)||`<p class="sub" style="padding:18px 2px">Nothing matches “${esc(LABQ)}”.</p>`;return}
 const r=_lr39.apply(this,arguments);
 try{if(!box)return r;let h="";
  if(c=="all"||q)h=XS39.map(s=>xSet39(s.id,q,true)).join("");
  else h=`<div class="labu" style="--uc:var(--blue)"><p class="labuh">Model sets</p>`+XS39.map(s=>{const n=xItems39(s.id,"").length;return `<div class="labrow"><button class="labgo" onclick="labSet('${s.id}')"><span class="grow"><b>${esc(s.n)}</b><small>${n} model${n>1?"s":""}</small></span></button><button class="labflask" onclick="labSet('${s.id}')" aria-label="Show the ${esc(s.n)} models">${IC.flask}</button></div>`}).join("")+`</div>`;
  if(h){if(!box.querySelector(".labu"))box.innerHTML=h;else box.insertAdjacentHTML("afterbegin",h)}
 }catch(e){}return r};

/* course name on the Lab's picker button (labName() only knows real courses) */
const _lab39=lab;lab=function(){const r=_lab39.apply(this,arguments);try{const s=XS39.find(z=>z.id==labCur()),e=$(".labsel span");if(s&&e)e.textContent=s.n}catch(e){}return r};

/* course menu: a "Model sets" group under the user's courses */
const _lp39=labPick;labPick=function(){const r=_lp39.apply(this,arguments);try{const sh=$("#scrim .sheet"),cur=labCur(),first=sh&&sh.querySelector(".pickl");
 if(first)first.insertAdjacentHTML("afterend",`<p class="gl">Model sets</p><div class="pickl">`+XS39.map(s=>`<button class="pickr ${cur==s.id?"on":""}" onclick="labSet('${s.id}')"><span class="grow">${esc(s.n)}</span>${cur==s.id?IC.check:""}</button>`).join("")+`</div>`)}catch(e){}return r};

/* one model, full screen (same layout as a lesson's model in the Lab) */
function labX39(id){const d=XD39.find(z=>z.id==id);if(!d||!DEMOS[id])return lab();
 try{if(view=="lab")LABY25=scrollY;LAB25=null}catch(e){}LABX39=id;view="labdemo";
 shell(topbar(curSub())+`<div class="pad"><button class="back" onclick="lab()">${IC.back}Back to the lab</button><div id="labd"></div><div class="labnext"><p class="kick">Model set</p><b>${esc(d.suggestedLesson)}</b><small>${esc(d.course)}</small></div></div>`);
 mountDemo($("#labd"),id);window.scrollTo(0,0)}
const _lo39=labOpen;labOpen=function(){LABX39=null;return _lo39.apply(this,arguments)};
const _fc39=fbCtx;fbCtx=function(){const c=_fc39.apply(this,arguments);try{if(c&&view=="labdemo"&&LABX39){const d=XD39.find(z=>z.id==LABX39);if(d){c.ltitle=c.ltitle||d.suggestedLesson;c.part=c.part||("demo "+d.id)}}}catch(e){}return c};
