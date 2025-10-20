// ===== DOM ELEMENTS =====
const output = document.getElementById("output")
const commandInput = document.getElementById("command-input")
const typedText = document.getElementById("typed-text")

// ===== STATE MANAGEMENT =====
const commandHistory = []
let historyIndex = -1
let currentInput = ""

// ===== ASCII ART =====
const asciiArt = `
   ██████╗███████╗██╗  ██╗   ██╗ █████╗ ███╗   ██╗
  ██╔════╝██╔════╝██║  ╚██╗ ██╔╝██╔══██╗████╗  ██║
  ██║     █████╗  ██║   ╚████╔╝ ███████║██╔██╗ ██║
  ██║     ██╔══╝  ██║    ╚██╔╝  ██╔══██║██║╚██╗██║
  ╚██████╗███████╗███████╗██║   ██║  ██║██║ ╚████║
   ╚═════╝╚══════╝╚══════╝╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝
`

// ===== CV DATA =====
const cvData = {
  profil: {
    nom: "Célyan MICOL",
    github: "https://github.com/naylec-school",
    description:
      "Candidat en BTS SIO option SISR, titulaire d'un Bac Pro SN spécialité RISC (Mention Très Bien). Expériences pratiques en réseaux informatiques, support technique et développement Python. Motivé, autonome et adaptable, avec de solides compétences en travail d'équipe et résolution de problèmes.",
  },
  formation: [
    {
      etablissement: "Pôle Formation CFAI AFPI Loire-Drôme-Ardèche",
      diplome: "BTS SIO (Services Informatiques aux Organisations), option SISR",
      periode: "Sept. 2025 – Juil. 2027",
      details: ["Réseaux informatiques, développement, infrastructures Systèmes et Réseaux"],
    },
    {
      etablissement: "Lycée Professionnel Pierre DESGRANGES",
      diplome: "Baccalauréat Professionnel SN (Systèmes Numériques), option RISC – Mention Très Bien",
      periode: "Sept. 2022 – Sept. 2025",
      details: ["Réseaux informatiques et systèmes communicants"],
    },
  ],
  experience: [
    {
      entreprise: "HEF Groupe",
      poste: "Technicien informatique (Alternance)",
      periode: "Sept. 2025 – Aujourd'hui",
      lieu: "Andrézieux-Bouthéon, Auvergne-Rhône-Alpes",
      missions: [
        "Support technique et maintenance des infrastructures réseaux",
        "Gestion quotidienne des incidents utilisateurs et résolution de problèmes",
      ],
    },
    {
      entreprise: "McDonald's",
      poste: "Équipier polyvalent (CDI temps partiel)",
      periode: "Oct. 2023 – Juil. 2025",
      lieu: "La Fouillouse, Auvergne-Rhône-Alpes",
      missions: [
        "Développement de compétences en communication et travail d'équipe",
        "Gestion efficace du temps en parallèle des études",
      ],
    },
    {
      entreprise: "Abicom",
      poste: "Stagiaire",
      periode: "Sept. 2024 – Nov. 2024",
      lieu: "Saint-Étienne",
      missions: ["Réseaux informatiques et infrastructure réseau", "Administration de serveurs Windows"],
    },
    {
      entreprise: "École des Mines de Saint-Étienne",
      poste: "Stagiaire",
      periode: "Mars 2024 – Avr. 2024",
      lieu: "Saint-Étienne",
      missions: ["Développement Python (Tkinter)", "Initiation à des projets IT académiques"],
    },
    {
      entreprise: "OELIS",
      poste: "Stagiaire",
      periode: "Nov. 2023 – Déc. 2023 & Mai 2023 – Juin 2023",
      lieu: "La Talaudière",
      missions: ["Réseaux informatiques et support technique", "Notions d'électricité et systèmes numériques"],
    },
  ],
  competences: {
    programmation: ["Python", "HTML", "CSS", "Arduino", "JavaScript (notions)"],
    systemes: ["Linux (Arch, Debian, etc.)", "Windows", "Notions fondamentales en réseau"],
    outils: ["Suite bureautique (OnlyOffice, Obsidian)", "Notions de dév", "Outils réseau (Putty, shell, terminal)"],
  },
  softskills: [
    "Autonomie : Capable de gérer plusieurs expériences et responsabilités simultanément",
    "Adaptabilité : Expériences variées en entreprise, école et bénévolat",
    "Communication : Travail en équipe et support utilisateur",
    "Esprit d'équipe : Renforcé par expérience professionnelle continue",
    "Curiosité : Multiples stages dans différents domaines IT",
    "Créativité : Développement de projets informatique et résolution de problèmes",
  ],
  langues: ["Français : Langue maternelle", "Anglais : Compétence professionnelle limitée", "Espagnol : Notions"],
  benevolat: [
    {
      organisation: "Banque Alimentaire Auvergne",
      role: "Bénévole",
      periode: "Nov. 2024",
      description: "Participation à une collecte alimentaire, engagement sociétal et esprit d'équipe",
    },
  ],
}

// ===== COMMAND HANDLERS =====
const commands = {
  help: () => {
    return `
<span class="section-title">📋 Commandes disponibles :</span>
<div class="item">
  <span class="command">profil</span>       - Afficher le profil
  <span class="command">formation</span>    - Afficher la formation
  <span class="command">experience</span>   - Afficher l'expérience professionnelle
  <span class="command">competences</span>  - Afficher les compétences techniques
  <span class="command">softskills</span>   - Afficher les soft skills
  <span class="command">langues</span>      - Afficher les langues
  <span class="command">benevolat</span>    - Afficher le bénévolat
  <span class="command">contact</span>      - Afficher les informations de contact
  <span class="command">all</span>          - Afficher tout le CV
  <span class="command">clear</span>        - Effacer le terminal
  <span class="command">help</span>         - Afficher cette aide
</div>`
  },

  profil: () => {
    return `
<span class="section-title">👤 PROFIL</span>
<div class="item">
  <span class="item-title">${cvData.profil.nom}</span>
  <div class="item-description">
    🔗 GitHub: <a href="${cvData.profil.github}" target="_blank" rel="noopener noreferrer" class="link">${cvData.profil.github}</a>
  </div>
  <div class="item-description">
    ${cvData.profil.description}
  </div>
</div>`
  },

  formation: () => {
    let result = '<span class="section-title">🎓 FORMATION</span>'
    cvData.formation.forEach((f) => {
      result += `
<div class="item">
  <span class="item-title">${f.etablissement}</span>
  <div class="item-subtitle">${f.diplome}</div>
  <div class="item-subtitle">📅 ${f.periode}</div>
  ${f.details.map((d) => `<div class="item-description">• ${d}</div>`).join("")}
</div>`
    })
    return result
  },

  experience: () => {
    let result = '<span class="section-title">💼 EXPÉRIENCE PROFESSIONNELLE</span>'
    cvData.experience.forEach((e) => {
      result += `
<div class="item">
  <span class="item-title">${e.entreprise} - ${e.poste}</span>
  <div class="item-subtitle">📅 ${e.periode} | 📍 ${e.lieu}</div>
  ${e.missions.map((m) => `<div class="item-description">• ${m}</div>`).join("")}
</div>`
    })
    return result
  },

  competences: () => {
    return `
<span class="section-title">🛠 COMPÉTENCES TECHNIQUES</span>
<div class="item">
  <span class="item-title">Programmation :</span>
  <div class="item-description">${cvData.competences.programmation.join(", ")}</div>
</div>
<div class="item">
  <span class="item-title">Systèmes :</span>
  <div class="item-description">${cvData.competences.systemes.join(", ")}</div>
</div>
<div class="item">
  <span class="item-title">Outils :</span>
  <div class="item-description">${cvData.competences.outils.join(", ")}</div>
</div>`
  },

  softskills: () => {
    let result = '<span class="section-title">🧠 SOFT SKILLS</span>'
    cvData.softskills.forEach((s) => {
      result += `<div class="item"><div class="item-description">• ${s}</div></div>`
    })
    return result
  },

  langues: () => {
    let result = '<span class="section-title">🌍 LANGUES</span>'
    cvData.langues.forEach((l) => {
      result += `<div class="item"><div class="item-description">• ${l}</div></div>`
    })
    return result
  },

  benevolat: () => {
    let result = '<span class="section-title">🤝 BÉNÉVOLAT</span>'
    cvData.benevolat.forEach((b) => {
      result += `
<div class="item">
  <span class="item-title">${b.organisation} - ${b.role}</span>
  <div class="item-subtitle">📅 ${b.periode}</div>
  <div class="item-description">${b.description}</div>
</div>`
    })
    return result
  },

  contact: () => {
    return `
<span class="section-title">📧 CONTACT</span>
<div class="item">
  <div class="item-description">🔗 GitHub: <a href="${cvData.profil.github}" target="_blank" rel="noopener noreferrer" class="link">${cvData.profil.github}</a></div>
  <div class="item-description">💼 LinkedIn: <span class="info">À ajouter</span></div>
  <div class="item-description">📧 Email: <span class="info">À ajouter</span></div>
</div>`
  },

  all: () => {
    return (
      commands.profil() +
      commands.formation() +
      commands.experience() +
      commands.competences() +
      commands.softskills() +
      commands.langues() +
      commands.benevolat() +
      commands.contact()
    )
  },

  clear: () => {
    output.innerHTML = ""
    return ""
  },
}

// ===== UTILITY FUNCTIONS =====
function printOutput(text, className = "") {
  requestAnimationFrame(() => {
    const line = document.createElement("div")
    line.className = `output-line ${className}`
    line.innerHTML = text
    output.appendChild(line)
    output.parentElement.scrollTop = output.parentElement.scrollHeight
  })
}

function processCommand(cmd) {
  const trimmedCmd = cmd.trim().toLowerCase()

  printOutput(`<span class="prompt">visitor@celyan-cv:~$</span> <span class="command">${cmd}</span>`)

  if (trimmedCmd === "") {
    return
  }

  if (trimmedCmd && (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== trimmedCmd)) {
    commandHistory.push(trimmedCmd)
  }
  historyIndex = commandHistory.length

  if (commands[trimmedCmd]) {
    const result = commands[trimmedCmd]()
    if (result) {
      printOutput(result)
    }
  } else {
    printOutput(`<span class="error">Commande non reconnue: "${cmd}"</span>`, "error")
    printOutput(
      '<span class="info">Tapez <span class="command">help</span> pour voir les commandes disponibles.</span>',
      "info",
    )
  }
}

function autocomplete(partial) {
  const availableCommands = Object.keys(commands)
  const matches = availableCommands.filter((cmd) => cmd.startsWith(partial.toLowerCase()))

  if (matches.length === 1) {
    return matches[0]
  } else if (matches.length > 1) {
    let commonPrefix = matches[0]
    for (let i = 1; i < matches.length; i++) {
      let j = 0
      while (j < commonPrefix.length && j < matches[i].length && commonPrefix[j] === matches[i][j]) {
        j++
      }
      commonPrefix = commonPrefix.substring(0, j)
    }
    return commonPrefix
  }
  return partial
}

// ===== EVENT LISTENERS =====
commandInput.addEventListener("input", (e) => {
  typedText.textContent = e.target.value
  currentInput = e.target.value
})

commandInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = commandInput.value
    processCommand(cmd)
    commandInput.value = ""
    typedText.textContent = ""
    currentInput = ""
  } else if (e.key === "ArrowUp") {
    e.preventDefault()
    if (commandHistory.length > 0) {
      if (historyIndex === commandHistory.length) {
        currentInput = commandInput.value
      }
      if (historyIndex > 0) {
        historyIndex--
        commandInput.value = commandHistory[historyIndex]
        typedText.textContent = commandHistory[historyIndex]
      }
    }
  } else if (e.key === "ArrowDown") {
    e.preventDefault()
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++
      commandInput.value = commandHistory[historyIndex]
      typedText.textContent = commandHistory[historyIndex]
    } else if (historyIndex === commandHistory.length - 1) {
      historyIndex = commandHistory.length
      commandInput.value = currentInput
      typedText.textContent = currentInput
    }
  } else if (e.key === "Tab") {
    e.preventDefault()
    const currentValue = commandInput.value.trim()
    if (currentValue) {
      const completed = autocomplete(currentValue)
      commandInput.value = completed
      typedText.textContent = completed
    }
  } else if (e.ctrlKey && e.key === "l") {
    e.preventDefault()
    commands.clear()
  } else if (e.ctrlKey && e.key === "c") {
    e.preventDefault()
    commandInput.value = ""
    typedText.textContent = ""
    printOutput(`<span class="prompt">visitor@celyan-cv:~$</span> ^C`)
  }
})

// ===== INITIALIZATION =====
window.addEventListener("load", () => {
  printOutput(`<div class="ascii-art">${asciiArt}</div>`)
  printOutput('<span class="success">Bienvenue sur le CV interactif de Célyan MICOL !</span>', "success")
  printOutput(
    '<span class="info">Tapez <span class="command">help</span> pour voir les commandes disponibles.</span>',
    "info",
  )
  printOutput("")
  commandInput.focus()
})

// ===== FOCUS MANAGEMENT =====
const terminal = document.querySelector(".terminal")

terminal.addEventListener("click", (e) => {
  if (e.target.tagName !== "A") {
    commandInput.focus()
  }
})

document.addEventListener("click", (e) => {
  if (e.target.tagName !== "A") {
    commandInput.focus()
  }
})

terminal.addEventListener(
  "touchstart",
  (e) => {
    if (e.target.tagName !== "A") {
      e.preventDefault()
      commandInput.focus()
    }
  },
  { passive: false },
)

commandInput.addEventListener("blur", () => {
  setTimeout(() => {
    if (document.activeElement.tagName !== "A") {
      commandInput.focus()
    }
  }, 0)
})
