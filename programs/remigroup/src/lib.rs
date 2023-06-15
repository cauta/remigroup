use anchor_lang::prelude::*;

declare_id!("79FsDa6rQT7ATFyQcZna56VEdDBcimcsehaPB7ktxtZe");

#[program]
pub mod remigroup {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
