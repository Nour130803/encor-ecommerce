import { Routes } from '@angular/router';

import { HomeComponent } from './components/client/home/home.component';
import { InscriptionComponent } from './components/auth/inscription/inscription.component';
import { VerifierCodeComponent } from './components/auth/verifier-code/verifier-code.component';
import { ConnexionComponent } from './components/auth/connexion/connexion.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { VerifyCodeComponent } from './components/auth/verify-code/verify-code.component';
import {ResetPasswordComponent} from './components/auth/reset-password/reset-password.component';

import { AjouterProduitComponent } from './components/admin/ajouter-produit/ajouter-produit.component';
import { ModifierProduitComponent } from './components/admin/modifier-produit/modifier-produit.component';


import { NouveautesComponent } from './components/client/nouveautes/nouveautes.component';
import { FemmeComponent } from './components/client/femme/femme.component';
import { HommeComponent } from './components/client/homme/homme.component';
import { EnfantComponent } from './components/client/enfant/enfant.component';
import { FavorisComponent } from './components/client/favoris/favoris.component';
import { PanierComponent } from './components/client/panier/panier.component';
import { PaiementComponent } from './components/client/paiement/paiement.component';
import { CommandeComponent } from './components/client/commande/commande.component';
import { SuiviCommandeComponent } from './components/client/suivi-commande/suivi-commande.component';
import { ProfilComponent } from './components/client/profil/profil.component';
import { RechercheComponent } from './components/client/recherche/recherche.component';

// ⭐ ADMIN NAVBAR standalone
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { AdminCommandeComponent } from './components/admin/admin-commande/admin-commande.component';
import { AdminProfilComponent } from './components/admin/admin-profil/admin-profil.component';

import { TypeProduitComponent} from './components/admin/type-produit/type-produit.component';

import {LivreurLivraisonComponent } from './components/livreur/livreur-livraison/livreur-livraison.component';

import {LivreurNavbarComponent } from './components/livreur/livreur-navbar/livreur-navbar.component';
import {LivreurLivreeComponent } from './components/livreur/livreur-livree/livreur-livree.component';
import {LivreurHistoriqueComponent } from './components/livreur/livreur-historique/livreur-historique.component';
import {ProfilLivreurComponent } from './components/livreur/profil-livreur/profil-livreur.component';

import {LivreurRechercheComponent  } from './components/livreur/livreur-recherche/livreur-recherche.component';


export const routes: Routes = [

  // 🏠 CLIENT
  { path: '', component: HomeComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'verifier-code', component: VerifierCodeComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'motdepasse', component: ForgotPasswordComponent },
  { path: 'verifie-code', component: VerifyCodeComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  // ⭐ ADMIN
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: AdminNavbarComponent
      },
      {
        path: 'ajouter-produit',
        component: AjouterProduitComponent
      },
      {
        path: 'modifier-produit',
        component: ModifierProduitComponent
      },
       {
        path: 'commandes',
        component: AdminCommandeComponent
      },
       {
        path: 'profil',
        component: AdminProfilComponent
      },
    
       {
        path: 'type-produit',
        component: TypeProduitComponent
      },
      
      
    ]
  },

  // 👗 CLIENT
  { path: 'nouveautes', component: NouveautesComponent },
  { path: 'femme', component: FemmeComponent },
  { path: 'homme', component: HommeComponent },
  { path: 'enfants', component: EnfantComponent },

  // ❤️ FAVORIS - PANIER
  { path: 'favoris', component: FavorisComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'paiement', component: PaiementComponent },

  // 🧾 COMMANDES
  { path: 'commande', component: CommandeComponent },
  { path: 'suivi-commande/:id', component: SuiviCommandeComponent },

  // 👤 PROFIL
  { path: 'profil', component: ProfilComponent },

  // 🔍 RECHERCHE
  { path: 'recherche', component: RechercheComponent },


    {
    path: 'livreur',
    children: [
      {
        path: '',
        component: LivreurNavbarComponent
      },
      {
        path: 'valider-livraison',
        component: LivreurLivraisonComponent
      },
       {
        path: 'etat-livraison',
        component: LivreurLivreeComponent
      },
       {
         path: 'historique-livraison',
        component: LivreurHistoriqueComponent
      },
      {
         path: 'profil',
        component: ProfilLivreurComponent
      },
       {
         path: 'recherche',
        component: LivreurRechercheComponent 
      },
      
      
      
    ]
  },


];
