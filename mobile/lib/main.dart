import 'package:scialla/pages/login_page.dart';
import 'package:scialla/pages/tabs_page.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'appwrite/auth_api.dart';

void main() async {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
        providers: [
          ChangeNotifierProvider(
            create: (context) => AuthAPI(),
          ),
        ],
        child: Consumer(builder: (context, AuthAPI auth, child) {
          return MaterialApp(
            title: 'Appwrite Auth Demo',
            debugShowCheckedModeBanner: false,
            home: auth.status == AuthStatus.uninitialized
                ? const Scaffold(
                    body: Center(child: CircularProgressIndicator()),
                  )
                : auth.status == AuthStatus.authenticated
                    ? const TabsPage()
                    : const LoginPage(),
            /*theme: ThemeData(
            colorScheme: ColorScheme.fromSwatch().copyWith(
              primary: const Color(0xFFE91052),
            )
          )*/
          );
        }));
  }
}
