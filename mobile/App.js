import React from 'react';
import { SafeAreaView, StatusBar, View, Text, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native';

const categories = ['Chantiers', 'Travaux & services', 'Matériaux', 'Professionnels'];
const demos = [
  { title: 'Construction d’une villa basse', city: 'Abidjan · Cocody', type: 'Chantier', price: 'À discuter', icon: '🏗️' },
  { title: 'Ciment et fer à béton disponibles', city: 'Bouaké · Air France', type: 'Matériaux', price: 'Sur devis', icon: '🧱' },
  { title: 'Équipe de maçons disponible', city: 'Abidjan · Yopougon', type: 'Travaux', price: 'À convenir', icon: '👷' },
];

export default function App() {
  const [search, setSearch] = React.useState('');
  const [showForm, setShowForm] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [city, setCity] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [notice, setNotice] = React.useState('');
  const filtered = demos.filter(x => (x.title + x.city + x.type).toLowerCase().includes(search.toLowerCase()));

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={s.page}>
        <View style={s.header}>
          <View style={s.brandIcon}><Text style={s.brandIconText}>⌂</Text></View>
          <View><Text style={s.brand}>MON<Text style={{color:'#91a83d'}}>CHANTIER</Text></Text><Text style={s.tagline}>LE BTP EN UN SEUL ENDROIT</Text></View>
          <Pressable style={s.publish} onPress={() => setShowForm(v => !v)}><Text style={s.publishText}>＋ Publier</Text></Pressable>
        </View>
        <View style={s.hero}>
          <Text style={s.kicker}>LA PLATEFORME BTP EN CÔTE D’IVOIRE</Text>
          <Text style={s.heading}>Construisons{ '\n' }<Text style={s.italic}>ensemble.</Text></Text>
          <Text style={s.desc}>Chantiers, artisans, matériaux et services BTP. Trouvez les bonnes opportunités et faites avancer vos projets.</Text>
          <Pressable style={s.cta} onPress={() => setShowForm(v => !v)}><Text style={s.ctaText}>＋ Publier une annonce</Text></Pressable>
        </View>
        {showForm ? <View style={s.form}>
          <Text style={s.formTitle}>Nouvelle annonce MON CHANTIER</Text>
          <TextInput style={s.input} placeholder="Titre de l'annonce" value={title} onChangeText={setTitle}/>
          <TextInput style={s.input} placeholder="Ville / commune" value={city} onChangeText={setCity}/>
          <TextInput style={[s.input,s.multiline]} placeholder="Décrivez votre annonce" multiline value={description} onChangeText={setDescription}/>
          <Pressable style={s.cta} onPress={() => { if (!title.trim() || !city.trim() || !description.trim()) { setNotice('Renseignez le titre, la ville et la description.'); return; } setNotice('Annonce saisie. Le backend sera connecté pour enregistrer et publier durablement.'); }}><Text style={s.ctaText}>Préparer l’annonce</Text></Pressable>
          <Text style={s.notice}>{notice}</Text>
        </View> : null}
        <Text style={s.sectionTitle}>Explorer les annonces</Text>
        <TextInput style={s.search} placeholder="Rechercher un chantier, un matériau, un artisan…" value={search} onChangeText={setSearch}/>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chips}>{categories.map(c=><View key={c} style={s.chip}><Text style={s.chipText}>{c}</Text></View>)}</ScrollView>
        {filtered.map((item,i)=><View key={i} style={s.card}>
          <View style={s.cardIcon}><Text style={{fontSize:30}}>{item.icon}</Text></View>
          <Text style={s.cardType}>{item.type.toUpperCase()}</Text>
          <Text style={s.cardTitle}>{item.title}</Text>
          <Text style={s.city}>⌖ {item.city}</Text>
          <Text style={s.price}>{item.price}</Text>
        </View>)}
        <Text style={s.footer}>MON CHANTIER · Côte d’Ivoire</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#f6f8f5'}, page:{padding:18,paddingBottom:40},
  header:{flexDirection:'row',alignItems:'center',gap:9,marginBottom:24},
  brandIcon:{width:42,height:42,borderRadius:12,backgroundColor:'#174b36',alignItems:'center',justifyContent:'center'},
  brandIconText:{fontSize:24,color:'#d9ed76'},brand:{fontSize:17,fontWeight:'900',color:'#174b36'},tagline:{fontSize:8,letterSpacing:1.2,color:'#758078'},
  publish:{marginLeft:'auto',backgroundColor:'#174b36',paddingHorizontal:12,paddingVertical:10,borderRadius:8},publishText:{color:'#fff',fontWeight:'700',fontSize:12},
  hero:{backgroundColor:'#e8eee6',borderRadius:18,padding:20,marginBottom:22},kicker:{fontSize:10,fontWeight:'800',color:'#56705e',letterSpacing:1.1},heading:{fontSize:40,fontWeight:'900',color:'#173b2b',marginTop:14,lineHeight:44},italic:{color:'#81983a'},desc:{fontSize:14,lineHeight:21,color:'#526058',marginTop:12},cta:{backgroundColor:'#174b36',padding:14,borderRadius:9,alignItems:'center',marginTop:16},ctaText:{color:'#fff',fontWeight:'800'},
  sectionTitle:{fontSize:24,fontWeight:'900',color:'#173b2b',marginBottom:12},search:{backgroundColor:'#fff',borderWidth:1,borderColor:'#e1e7e1',borderRadius:10,padding:14,marginBottom:12},
  chips:{gap:8,paddingBottom:12},chip:{backgroundColor:'#e5ebdf',paddingHorizontal:12,paddingVertical:9,borderRadius:20},chipText:{color:'#345342',fontSize:12,fontWeight:'700'},
  card:{backgroundColor:'#fff',padding:16,borderRadius:14,marginBottom:12,borderWidth:1,borderColor:'#e8ece8'},cardIcon:{height:72,backgroundColor:'#edf1e9',borderRadius:10,alignItems:'center',justifyContent:'center',marginBottom:12},cardType:{fontSize:10,fontWeight:'800',color:'#81983a',letterSpacing:1},cardTitle:{fontSize:17,fontWeight:'800',color:'#173b2b',marginTop:6},city:{fontSize:12,color:'#758078',marginTop:8},price:{fontSize:13,fontWeight:'800',color:'#174b36',marginTop:10},
  form:{backgroundColor:'#fff',padding:16,borderRadius:14,marginBottom:22,borderWidth:1,borderColor:'#dce5dc'},formTitle:{fontSize:18,fontWeight:'800',color:'#174b36',marginBottom:12},input:{borderWidth:1,borderColor:'#dce5dc',borderRadius:8,padding:12,marginBottom:10,backgroundColor:'#fff'},multiline:{height:100,textAlignVertical:'top'},notice:{fontSize:12,color:'#65756a',marginTop:8},footer:{textAlign:'center',color:'#89948c',fontSize:11,marginTop:20}
});
