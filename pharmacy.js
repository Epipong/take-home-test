export class Drug {
  /**
   * Drug class.
   * @param {string} name name of the drug.
   * @param {number} expiresIn value which denotes the number of days we have until the item expires.
   * @param {number} benefit value which denotes how powerful the drug is.
   */
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  /**
   * Set the value of benefit.
   * @param {number} benefit value which denotes how powerful the drug is.
   */
  updateBenefit() {
    if (this.benefit > 0) {
      --this.benefit;
    }
  }

  /**
   * Update the value of expiresIn.
   */
  updateExpiresIn() {
    --this.expiresIn;
  }
}

class HerbalTea extends Drug {
  updateBenefit() {
    if (this.benefit < 50) {
      this.benefit = this.expiresIn < 0 ? this.benefit + 2 : this.benefit + 1;
    }
  }
}

class MagicPill extends Drug {
  updateBenefit() {}
  updateExpiresIn() {}
}

class Fervex extends Drug {
  updateBenefit() {
    if (this.benefit < 50) {
      this.benefit = this.expiresIn <= 10 ? this.benefit + 2 : this.benefit + 1;
    }
  }
}

const drugsClassHandler = {
  "Herbal Tea": drug => new HerbalTea(drug.name, drug.expiresIn, drug.benefit),
  "Magic Pill": drug => new MagicPill(drug.name, drug.expiresIn, drug.benefit),
  Fervex: drug => new Fervex(drug.name, drug.expiresIn, drug.benefit)
};

export class Pharmacy {
  /**
   * Pharmacy class.
   * @param {Drug[]} drugs List of drugs.
   */
  constructor(drugs = []) {
    this.drugs = [];
    for (let drug of drugs) {
      if (drug.name in drugsClassHandler) {
        this.drugs.push(drugsClassHandler[drug.name](drug));
      } else {
        this.drugs.push(drug);
      }
    }
  }

  updateBenefitValue() {
    for (const drug of this.drugs) {
      drug.updateBenefit(drug.benefit - 1);
      drug.updateExpiresIn(drug.expiresIn - 1);
    }

    return this.drugs;
  }
}
